'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { calculateMortgage } from '@/lib/calculators/mortgage'
import { useI18n } from '@/lib/i18n/context'

export default function MortgageCalculator() {
  const { t, language } = useI18n()
  const [loanAmount, setLoanAmount] = useState<string>('1000000')
  const [interestRate, setInterestRate] = useState<string>('4.9')
  const [loanTerm, setLoanTerm] = useState<string>('30')
  const [repaymentType, setRepaymentType] = useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest')
  const [showSchedule, setShowSchedule] = useState<boolean>(false)
  const [showComparison, setShowComparison] = useState<boolean>(true)
  const [result, setResult] = useState<any>(null)
  const [comparisonResult, setComparisonResult] = useState<any>(null)

  useEffect(() => {
    const params = {
      loanAmount: parseFloat(loanAmount) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTerm: parseFloat(loanTerm) || 0,
      repaymentType,
    }
    setResult(calculateMortgage(params))
    
    const otherType: 'equal-principal-interest' | 'equal-principal' = repaymentType === 'equal-principal-interest' ? 'equal-principal' : 'equal-principal-interest'
    const otherParams = { ...params, repaymentType: otherType }
    setComparisonResult(calculateMortgage(otherParams))
  }, [loanAmount, interestRate, loanTerm, repaymentType])

  const getRepaymentTypeName = (type: string) => {
    return type === 'equal-principal-interest' 
      ? (language === 'zh' ? '等额本息' : 'Equal Principal & Interest')
      : (language === 'zh' ? '等额本金' : 'Equal Principal')
  }

  const getRepaymentDescription = (type: string) => {
    return type === 'equal-principal-interest' 
      ? (language === 'zh' ? '每月还款金额固定，适合收入稳定的借款人' : 'Fixed monthly payment, suitable for borrowers with stable income')
      : (language === 'zh' ? '每月本金固定，利息递减，适合希望提前还款的借款人' : 'Fixed monthly principal, decreasing interest, suitable for borrowers who want to prepay')
  }

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.calculators.mortgage}</h2>

      <div className="space-y-4 mb-8">
        <Input
          label={t.mortgage.loanAmount}
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <Input
          label={t.mortgage.interestRate}
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <Input
          label={t.mortgage.loanTerm}
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
        <Select
          label={t.mortgage.repaymentType}
          value={repaymentType}
          onChange={(e) => setRepaymentType(e.target.value as any)}
        >
          <option value="equal-principal-interest">{t.mortgage.equalPrincipalInterest}</option>
          <option value="equal-principal">{t.mortgage.equalPrincipal}</option>
        </Select>
      </div>

      {result && (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <p className="text-gray-700 font-medium mb-2">
                {t.mortgage.repaymentMethod}：<span className="text-blue-600">{getRepaymentTypeName(repaymentType)}</span>
              </p>
              <p className="text-xs text-gray-500">
                {getRepaymentDescription(repaymentType)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-600 mb-1">
                {repaymentType === 'equal-principal-interest' ? t.mortgage.monthlyPayment : t.mortgage.firstMonthPayment}
              </p>
              <p className="text-2xl font-bold text-blue-700">
                ¥{result.monthlyPayment.toFixed(2)}
              </p>
              {repaymentType === 'equal-principal' && result.monthlyPaymentDecrease && (
                <p className="text-xs text-blue-500 mt-1">
                  {t.mortgage.monthlyDecrease} ¥{result.monthlyPaymentDecrease.toFixed(2)}
                </p>
              )}
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-600 mb-1">{t.mortgage.totalPayment}</p>
              <p className="text-2xl font-bold text-green-700">
                ¥{result.totalPayment.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-sm text-purple-600 mb-1">{t.mortgage.totalInterest}</p>
              <p className="text-2xl font-bold text-purple-700">
                ¥{result.totalInterest.toFixed(2)}
              </p>
            </div>
          </div>

          {result.paymentSchedule && (
            <div className="mt-6">
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                {showSchedule ? t.mortgage.hideSchedule : t.mortgage.viewSchedule}
              </button>

              {showSchedule && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-3 text-left text-gray-600">{t.mortgage.period}</th>
                        <th className="py-2 px-3 text-right text-gray-600">{t.mortgage.monthlyPaymentLabel}</th>
                        <th className="py-2 px-3 text-right text-gray-600">{t.mortgage.principal}</th>
                        <th className="py-2 px-3 text-right text-gray-600">{t.mortgage.interest}</th>
                        <th className="py-2 px-3 text-right text-gray-600">{t.mortgage.remainingPrincipal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.paymentSchedule.slice(0, 24).map((payment: any) => (
                        <tr key={payment.month} className="border-b border-gray-100">
                          <td className="py-2 px-3 text-gray-900">{payment.month}{language === 'zh' ? '期' : ''}</td>
                          <td className="py-2 px-3 text-right text-gray-900">
                            ¥{payment.payment.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right text-green-600">
                            ¥{payment.principal.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right text-orange-600">
                            ¥{payment.interest.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-500">
                            ¥{payment.remainingPrincipal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {result.paymentSchedule.length > 24 && (
                        <tr>
                          <td colSpan={5} className="py-2 px-3 text-center text-gray-500 text-sm">
                            ... {t.mortgage.morePeriods.replace('{count}', String(result.paymentSchedule.length - 24))}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {repaymentType === 'equal-principal' && result.firstMonthPayment && result.lastMonthPayment && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">{t.mortgage.firstMonthPayment}</p>
                  <p className="text-xl font-bold text-blue-600">
                    ¥{result.firstMonthPayment.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.mortgage.lastMonthPayment}</p>
                  <p className="text-xl font-bold text-green-600">
                    ¥{result.lastMonthPayment.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {comparisonResult && (
            <div className="mt-6">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors"
              >
                {showComparison ? t.mortgage.hideComparison : t.mortgage.viewComparison}
              </button>

              {showComparison && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{t.mortgage.repaymentComparison}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-blue-600 mb-3">{getRepaymentTypeName(repaymentType)}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.mortgage.monthlyPayment}</span>
                          <span className="font-medium text-gray-900">
                            ¥{result.monthlyPayment.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.mortgage.totalPayment}</span>
                          <span className="font-medium text-gray-900">
                            ¥{result.totalPayment.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.mortgage.totalInterest}</span>
                          <span className="font-medium text-orange-600">
                            ¥{result.totalInterest.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-green-600 mb-3">{getRepaymentTypeName(repaymentType === 'equal-principal-interest' ? 'equal-principal' : 'equal-principal-interest')}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {repaymentType === 'equal-principal-interest' ? t.mortgage.firstMonthPayment : t.mortgage.monthlyPayment}
                          </span>
                          <span className="font-medium text-gray-900">
                            ¥{comparisonResult.monthlyPayment.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.mortgage.totalPayment}</span>
                          <span className="font-medium text-gray-900">
                            ¥{comparisonResult.totalPayment.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{t.mortgage.totalInterest}</span>
                          <span className="font-medium text-orange-600">
                            ¥{comparisonResult.totalInterest.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                    <p className="font-medium">💡 {t.mortgage.interestDifference}</p>
                    <p>
                      {result.totalInterest < comparisonResult.totalInterest 
                        ? `${getRepaymentTypeName(repaymentType)}${language === 'zh' ? '比' : ' vs '}${getRepaymentTypeName(repaymentType === 'equal-principal-interest' ? 'equal-principal' : 'equal-principal-interest')}${language === 'zh' ? '少支付利息' : ' saves ¥'}${(comparisonResult.totalInterest - result.totalInterest).toFixed(2)}`
                        : `${getRepaymentTypeName(repaymentType === 'equal-principal-interest' ? 'equal-principal' : 'equal-principal-interest')}${language === 'zh' ? '比' : ' vs '}${getRepaymentTypeName(repaymentType)}${language === 'zh' ? '少支付利息' : ' saves ¥'}${(result.totalInterest - comparisonResult.totalInterest).toFixed(2)}`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Card>
  )
}
