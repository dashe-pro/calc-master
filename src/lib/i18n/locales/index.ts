import { en, type Translations } from './en'
import { zh } from './zh'

// Delta translations — only override what differs from English
// Fallback: missing keys in any language default to English

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

const esDelta: DeepPartial<Translations> = {
  header: { title: 'CalcMaster' },
  footer: { copyright: '© 2026 CalcMaster. Todos los derechos reservados.', description: 'Herramientas de cálculo online gratuitas', privacy: 'Política de Privacidad' },
  common: { language: 'Idioma', searchPlaceholder: 'Buscar... (Ctrl+K)', noResults: 'Sin resultados' },
  home: { title: 'Calculadora Online', subtitle: 'Herramientas de cálculo gratuitas: conversión, finanzas, salud y más', unitConverters: 'Conversores', onlineCalculators: 'Calculadoras', devTools: 'Herramientas Dev', searchPlaceholder: 'Buscar... (Ctrl+K)', noResults: 'Sin resultados', recentTools: 'Recientes', myFavorites: 'Favoritos' },
  converters: { length: 'Conversor de Longitud', weight: 'Conversor de Peso', temperature: 'Conversor de Temperatura', area: 'Conversor de Área', data: 'Conversor de Datos', currency: 'Conversor de Moneda', time: 'Conversor de Tiempo' },
  calculators: { mortgage: 'Calculadora Hipotecaria', bmi: 'Calculadora de IMC', discount: 'Calculadora de Descuentos', tip: 'Calculadora de Propinas', compound: 'Interés Compuesto', date: 'Calculadora de Fechas', dueDate: 'Fecha de Parto', babyGrowth: 'Crecimiento Infantil', percentage: 'Calculadora de Porcentajes', age: 'Calculadora de Edad', randomNumber: 'Generador Aleatorio' },
  devTools: { jsonFormatter: 'Formateador JSON', timestampConverter: 'Conversor Timestamp', base64Encoder: 'Codificador Base64', urlEncoder: 'Codificador URL', regexTester: 'Probador Regex', codeFormatter: 'Formateador Código', textDiff: 'Comparador Texto', qrGenerator: 'Generador QR', passwordGenerator: 'Generador Contraseñas', colorConverter: 'Conversor Color' },
  bmi: { title: 'Calculadora de IMC', weight: 'Peso (kg)', height: 'Altura (cm)', underweight: 'Bajo peso', normal: 'Normal', overweight: 'Sobrepeso', obese: 'Obeso' },
  tip: { title: 'Calculadora de Propinas', billAmount: 'Monto (¥)', tipPercent: 'Propina (%)', splitCount: 'Personas', tip: 'Propina', total: 'Total', perPerson: 'Por persona' },
  discount: { title: 'Calculadora de Descuentos', originalPrice: 'Precio original (¥)', discountPercent: 'Descuento (%)', finalPrice: 'Precio final', savings: 'Ahorro' },
  compound: { title: 'Interés Compuesto', principal: 'Capital (¥)', rate: 'Tasa anual (%)', years: 'Años', monthlyContribution: 'Aporte mensual (¥)', futureValue: 'Valor futuro', totalContributions: 'Total aportes', totalInterest: 'Interés total' },
  date: { title: 'Calculadora de Fechas', startDate: 'Fecha inicio', endDate: 'Fecha fin', totalDays: 'Total días', workdays: 'Días hábiles', days: 'días' },
  dueDate: { title: 'Fecha de Parto', lastPeriod: 'Última menstruación', dueDate: 'Fecha de parto', weeksPregnant: 'Semanas', remainingDays: 'Días restantes', week: 'Semanas', days: 'días' },
  percentage: { title: 'Calculadora de Porcentajes', modePercentOf: '¿X% de Y?', modeWhatPercent: '¿X es qué % de Y?', modeChange: 'Cambio porcentual', value: 'Valor', percent: 'Porcentaje', total: 'Total', result: 'Resultado', from: 'De', to: 'A', increase: 'Aumento', decrease: 'Disminución' },
  ageCalc: { title: 'Calculadora de Edad', birthDate: 'Nacimiento', age: 'Edad', years: 'años', months: 'meses', days: 'días', totalDays: 'Total días', nextBirthday: 'Próximo cumpleaños', daysUntil: 'días', zodiac: 'Zodiaco' },
  randomNumber: { title: 'Generador Aleatorio', min: 'Mín', max: 'Máx', count: 'Cantidad', unique: 'Sin duplicados', generate: 'Generar', result: 'Resultado', copy: 'Copiar', copied: 'Copiado' },
  mortgage: { title: 'Calculadora Hipotecaria', loanAmount: 'Préstamo (¥)', interestRate: 'Tasa anual (%)', loanTerm: 'Plazo (años)', repaymentType: 'Tipo de pago', equalPrincipalInterest: 'Cuota fija', equalPrincipal: 'Principal fijo', repaymentMethod: 'Método', monthlyPayment: 'Pago mensual', firstMonthPayment: 'Primer pago', totalPayment: 'Pago total', totalInterest: 'Interés total', viewSchedule: 'Ver calendario', hideSchedule: 'Ocultar', period: 'Período', monthlyPaymentLabel: 'Cuota', principal: 'Principal', interest: 'Interés', remainingPrincipal: 'Saldo', morePeriods: '{count} períodos más', lastMonthPayment: 'Último pago', viewComparison: 'Comparar', hideComparison: 'Ocultar', repaymentComparison: 'Comparación', interestDifference: 'Diferencia', monthlyDecrease: 'Reducción mensual' },
  devToolUI: { copy: 'Copiar', copyResult: 'Copiar resultado', clear: 'Limpiar', format: 'Formatear', compress: 'Comprimir', encode: 'Codificar', decode: 'Decodificar', test: 'Probar', compare: 'Comparar', generateQR: 'Generar QR', download: 'Descargar', pageTitle: 'Herramientas Dev', backHome: 'Inicio', refresh: 'Regenerar', passwordStrength: 'Seguridad', strengthWeak: 'Débil', strengthFair: 'Regular', strengthGood: 'Buena', strengthStrong: 'Fuerte', uppercase: 'Mayúsculas', lowercase: 'Minúsculas', numbers: 'Dígitos', symbolsOption: 'Símbolos', excludeAmbiguous: 'Sin ambiguos', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: 'Vista previa' },
}

const jaDelta: DeepPartial<Translations> = {
  footer: { copyright: '© 2026 CalcMaster. All rights reserved.', description: '無料のオンライン計算ツール', privacy: 'プライバシーポリシー' },
  common: { language: '言語', searchPlaceholder: '検索... (Ctrl+K)', noResults: '見つかりません' },
  home: { title: 'オンライン計算ツール', subtitle: '単位変換、財務計算、健康計算、開発者ツールなど、無料のオンライン計算ツール', unitConverters: '単位変換', onlineCalculators: '計算機', devTools: '開発ツール', searchPlaceholder: '検索... (Ctrl+K)', noResults: '見つかりません', recentTools: '最近使用', myFavorites: 'お気に入り' },
  converters: { length: '長さ変換', weight: '重さ変換', temperature: '温度変換', area: '面積変換', data: 'データ変換', currency: '通貨変換', time: '時間変換' },
  calculators: { mortgage: '住宅ローン計算', bmi: 'BMI計算', discount: '割引計算', tip: 'チップ計算', compound: '複利計算', date: '日付計算', dueDate: '出産予定日', babyGrowth: '成長曲線', percentage: 'パーセント計算', age: '年齢計算', randomNumber: '乱数生成' },
  devTools: { jsonFormatter: 'JSONフォーマッター', timestampConverter: 'タイムスタンプ変換', base64Encoder: 'Base64エンコーダー', urlEncoder: 'URLエンコーダー', regexTester: '正規表現テスト', codeFormatter: 'コードフォーマッター', textDiff: 'テキスト比較', qrGenerator: 'QRコード生成', passwordGenerator: 'パスワード生成', colorConverter: 'カラー変換' },
  bmi: { title: 'BMI計算', weight: '体重 (kg)', height: '身長 (cm)', underweight: '低体重', normal: '標準', overweight: '過体重', obese: '肥満' },
  tip: { title: 'チップ計算', billAmount: '金額 (¥)', tipPercent: 'チップ (%)', splitCount: '人数', tip: 'チップ', total: '合計', perPerson: '一人あたり' },
  discount: { title: '割引計算', originalPrice: '元値 (¥)', discountPercent: '割引 (%)', finalPrice: '割引後', savings: '節約額' },
  compound: { title: '複利計算', principal: '元金 (¥)', rate: '年利 (%)', years: '年数', monthlyContribution: '月額積立 (¥)', futureValue: '将来価値', totalContributions: '総拠出額', totalInterest: '総利息' },
  date: { title: '日付計算', startDate: '開始日', endDate: '終了日', totalDays: '合計日数', workdays: '営業日', days: '日' },
  dueDate: { title: '出産予定日', lastPeriod: '最終月経', dueDate: '出産予定日', weeksPregnant: '妊娠週数', remainingDays: '残り日数', week: '週', days: '日' },
  percentage: { title: 'パーセント計算', modePercentOf: 'XのY%は？', modeWhatPercent: 'XはYの何%？', modeChange: '変化率', value: '値', percent: 'パーセント', total: '全体', result: '結果', from: 'から', to: 'まで', increase: '増加', decrease: '減少' },
  ageCalc: { title: '年齢計算', birthDate: '生年月日', age: '年齢', years: '歳', months: 'ヶ月', days: '日', totalDays: '合計日数', nextBirthday: '次の誕生日', daysUntil: '日後', zodiac: '干支/星座' },
  randomNumber: { title: '乱数生成', min: '最小', max: '最大', count: '個数', unique: '重複なし', generate: '生成', result: '結果', copy: 'コピー', copied: 'コピー済' },
  mortgage: { title: '住宅ローン計算', loanAmount: '借入額 (¥)', interestRate: '年利 (%)', loanTerm: '期間 (年)', repaymentType: '返済方式', equalPrincipalInterest: '元利均等', equalPrincipal: '元金均等', repaymentMethod: '返済方法', monthlyPayment: '月額返済', firstMonthPayment: '初回返済', totalPayment: '総返済額', totalInterest: '総利息', viewSchedule: '返済表', hideSchedule: '閉じる', period: '回', monthlyPaymentLabel: '返済額', principal: '元金', interest: '利息', remainingPrincipal: '残高', morePeriods: '残り{count}回', lastMonthPayment: '最終返済', viewComparison: '比較', hideComparison: '閉じる', repaymentComparison: '返済比較', interestDifference: '利息差', monthlyDecrease: '月額減少' },
  devToolUI: { copy: 'コピー', copyResult: '結果をコピー', clear: 'クリア', format: 'フォーマット', compress: '圧縮', encode: 'エンコード', decode: 'デコード', test: 'テスト', compare: '比較', generateQR: 'QR生成', download: 'ダウンロード', pageTitle: '開発ツール', backHome: 'ホーム', refresh: '再生成', passwordStrength: '強度', strengthWeak: '弱い', strengthFair: '普通', strengthGood: '良い', strengthStrong: '強い', uppercase: '大文字', lowercase: '小文字', numbers: '数字', symbolsOption: '記号', excludeAmbiguous: '紛らわしい文字を除く', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: 'プレビュー' },
}

const koDelta: DeepPartial<Translations> = {
  footer: { copyright: '© 2026 CalcMaster. All rights reserved.', description: '무료 온라인 계산 도구', privacy: '개인정보처리방침' },
  common: { language: '언어', searchPlaceholder: '검색... (Ctrl+K)', noResults: '결과 없음' },
  home: { title: '온라인 계산기', subtitle: '단위 변환, 금융 계산, 건강 계산, 개발자 도구 등 무료 온라인 계산 도구', unitConverters: '단위 변환', onlineCalculators: '계산기', devTools: '개발 도구', searchPlaceholder: '검색... (Ctrl+K)', noResults: '결과 없음', recentTools: '최근 사용', myFavorites: '즐겨찾기' },
  converters: { length: '길이 변환', weight: '무게 변환', temperature: '온도 변환', area: '면적 변환', data: '데이터 변환', currency: '환율 변환', time: '시간 변환' },
  calculators: { mortgage: '주택담보대출', bmi: 'BMI 계산', discount: '할인 계산', tip: '팁 계산', compound: '복리 계산', date: '날짜 계산', dueDate: '출산예정일', babyGrowth: '성장 백분위', percentage: '백분율 계산', age: '나이 계산', randomNumber: '난수 생성' },
  devTools: { jsonFormatter: 'JSON 포맷터', timestampConverter: '타임스탬프 변환', base64Encoder: 'Base64 인코더', urlEncoder: 'URL 인코더', regexTester: '정규식 테스트', codeFormatter: '코드 포맷터', textDiff: '텍스트 비교', qrGenerator: 'QR 생성기', passwordGenerator: '비밀번호 생성', colorConverter: '색상 변환' },
  bmi: { title: 'BMI 계산', weight: '체중 (kg)', height: '신장 (cm)', underweight: '저체중', normal: '정상', overweight: '과체중', obese: '비만' },
  tip: { title: '팁 계산', billAmount: '금액 (¥)', tipPercent: '팁 (%)', splitCount: '인원', tip: '팁', total: '합계', perPerson: '1인당' },
  discount: { title: '할인 계산', originalPrice: '원가 (¥)', discountPercent: '할인율 (%)', finalPrice: '할인가', savings: '절약액' },
  compound: { title: '복리 계산', principal: '원금 (¥)', rate: '연이율 (%)', years: '기간', monthlyContribution: '월 적립 (¥)', futureValue: '미래 가치', totalContributions: '총 납입액', totalInterest: '총 이자' },
  date: { title: '날짜 계산', startDate: '시작일', endDate: '종료일', totalDays: '총 일수', workdays: '영업일', days: '일' },
  dueDate: { title: '출산예정일', lastPeriod: '마지막 생리', dueDate: '출산예정일', weeksPregnant: '임신 주수', remainingDays: '남은 일수', week: '주', days: '일' },
  percentage: { title: '백분율 계산', modePercentOf: 'X의 Y%는?', modeWhatPercent: 'X는 Y의 몇 %?', modeChange: '변화율', value: '값', percent: '백분율', total: '전체', result: '결과', from: '에서', to: '으로', increase: '증가', decrease: '감소' },
  ageCalc: { title: '나이 계산', birthDate: '생년월일', age: '나이', years: '세', months: '개월', days: '일', totalDays: '총 일수', nextBirthday: '다음 생일', daysUntil: '일 남음', zodiac: '띠/별자리' },
  randomNumber: { title: '난수 생성', min: '최소', max: '최대', count: '개수', unique: '중복 없음', generate: '생성', result: '결과', copy: '복사', copied: '복사됨' },
  mortgage: { title: '주택담보대출', loanAmount: '대출액 (¥)', interestRate: '연이율 (%)', loanTerm: '기간 (년)', repaymentType: '상환 방식', equalPrincipalInterest: '원리금균등', equalPrincipal: '원금균등', repaymentMethod: '상환 방법', monthlyPayment: '월 상환액', firstMonthPayment: '첫 달 상환', totalPayment: '총 상환액', totalInterest: '총 이자', viewSchedule: '상환 표', hideSchedule: '닫기', period: '회차', monthlyPaymentLabel: '월 납입', principal: '원금', interest: '이자', remainingPrincipal: '잔액', morePeriods: '{count}회 남음', lastMonthPayment: '마지막 상환', viewComparison: '비교', hideComparison: '닫기', repaymentComparison: '상환 비교', interestDifference: '이자 차이', monthlyDecrease: '월 감소액' },
  devToolUI: { copy: '복사', copyResult: '결과 복사', clear: '지우기', format: '포맷', compress: '압축', encode: '인코드', decode: '디코드', test: '테스트', compare: '비교', generateQR: 'QR 생성', download: '다운로드', pageTitle: '개발 도구', backHome: '홈', refresh: '재생성', passwordStrength: '강도', strengthWeak: '약함', strengthFair: '보통', strengthGood: '좋음', strengthStrong: '강력', uppercase: '대문자', lowercase: '소문자', numbers: '숫자', symbolsOption: '기호', excludeAmbiguous: '혼동 문자 제외', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: '미리보기' },
}

const frDelta: DeepPartial<Translations> = {
  footer: { copyright: '© 2026 CalcMaster. Tous droits réservés.', description: 'Outils de calcul en ligne gratuits', privacy: 'Confidentialité' },
  common: { language: 'Langue', searchPlaceholder: 'Rechercher... (Ctrl+K)', noResults: 'Aucun résultat' },
  home: { title: 'Calculatrice en Ligne', subtitle: 'Outils de calcul gratuits : conversion, finances, santé, développeur et plus', unitConverters: 'Convertisseurs', onlineCalculators: 'Calculatrices', devTools: 'Outils Dev', searchPlaceholder: 'Rechercher... (Ctrl+K)', noResults: 'Aucun résultat', recentTools: 'Récents', myFavorites: 'Favoris' },
  converters: { length: 'Convertisseur de Longueur', weight: 'Convertisseur de Poids', temperature: 'Convertisseur de Température', area: 'Convertisseur de Surface', data: 'Convertisseur de Données', currency: 'Convertisseur de Devises', time: 'Convertisseur de Temps' },
  calculators: { mortgage: 'Calculateur Hypothécaire', bmi: 'Calculateur d\'IMC', discount: 'Calculateur de Remise', tip: 'Calculateur de Pourboire', compound: 'Intérêts Composés', date: 'Calculateur de Dates', dueDate: 'Date d\'Accouchement', babyGrowth: 'Croissance Bébé', percentage: 'Calculateur de Pourcentage', age: 'Calculateur d\'Âge', randomNumber: 'Générateur Aléatoire' },
  devTools: { jsonFormatter: 'Formateur JSON', timestampConverter: 'Convertisseur Timestamp', base64Encoder: 'Encodeur Base64', urlEncoder: 'Encodeur URL', regexTester: 'Testeur Regex', codeFormatter: 'Formateur Code', textDiff: 'Comparateur Texte', qrGenerator: 'Générateur QR', passwordGenerator: 'Générateur Mot de Passe', colorConverter: 'Convertisseur Couleur' },
  bmi: { title: 'Calculateur d\'IMC', weight: 'Poids (kg)', height: 'Taille (cm)', underweight: 'Insuffisance pondérale', normal: 'Normal', overweight: 'Surpoids', obese: 'Obèse' },
  tip: { title: 'Calculateur de Pourboire', billAmount: 'Montant (¥)', tipPercent: 'Pourboire (%)', splitCount: 'Personnes', tip: 'Pourboire', total: 'Total', perPerson: 'Par personne' },
  discount: { title: 'Calculateur de Remise', originalPrice: 'Prix original (¥)', discountPercent: 'Remise (%)', finalPrice: 'Prix final', savings: 'Économie' },
  compound: { title: 'Intérêts Composés', principal: 'Capital (¥)', rate: 'Taux annuel (%)', years: 'Années', monthlyContribution: 'Versement mensuel (¥)', futureValue: 'Valeur future', totalContributions: 'Total versé', totalInterest: 'Intérêts totaux' },
  date: { title: 'Calculateur de Dates', startDate: 'Date début', endDate: 'Date fin', totalDays: 'Total jours', workdays: 'Jours ouvrés', days: 'jours' },
  dueDate: { title: 'Date d\'Accouchement', lastPeriod: 'Dernières règles', dueDate: 'Date prévue', weeksPregnant: 'Semaines de grossesse', remainingDays: 'Jours restants', week: 'Semaines', days: 'jours' },
  percentage: { title: 'Calculateur de Pourcentage', modePercentOf: 'X% de Y ?', modeWhatPercent: 'X est quel % de Y ?', modeChange: 'Variation en %', value: 'Valeur', percent: 'Pourcentage', total: 'Total', result: 'Résultat', from: 'De', to: 'À', increase: 'Augmentation', decrease: 'Diminution' },
  ageCalc: { title: 'Calculateur d\'Âge', birthDate: 'Date de naissance', age: 'Âge', years: 'ans', months: 'mois', days: 'jours', totalDays: 'Total jours', nextBirthday: 'Prochain anniversaire', daysUntil: 'jours', zodiac: 'Zodiaque' },
  randomNumber: { title: 'Générateur Aléatoire', min: 'Min', max: 'Max', count: 'Quantité', unique: 'Sans doublons', generate: 'Générer', result: 'Résultat', copy: 'Copier', copied: 'Copié' },
  mortgage: { title: 'Calculateur Hypothécaire', loanAmount: 'Montant (¥)', interestRate: 'Taux annuel (%)', loanTerm: 'Durée (ans)', repaymentType: 'Type', equalPrincipalInterest: 'Mensualité fixe', equalPrincipal: 'Capital fixe', repaymentMethod: 'Méthode', monthlyPayment: 'Mensualité', firstMonthPayment: '1er paiement', totalPayment: 'Total payé', totalInterest: 'Intérêts totaux', viewSchedule: 'Tableau', hideSchedule: 'Masquer', period: 'Période', monthlyPaymentLabel: 'Mensualité', principal: 'Capital', interest: 'Intérêts', remainingPrincipal: 'Restant', morePeriods: '{count} périodes restantes', lastMonthPayment: 'Dernier paiement', viewComparison: 'Comparer', hideComparison: 'Masquer', repaymentComparison: 'Comparaison', interestDifference: 'Différence', monthlyDecrease: 'Baisse mensuelle' },
  devToolUI: { copy: 'Copier', copyResult: 'Copier résultat', clear: 'Effacer', format: 'Formater', compress: 'Compresser', encode: 'Encoder', decode: 'Decoder', test: 'Tester', compare: 'Comparer', generateQR: 'Générer QR', download: 'Télécharger', pageTitle: 'Outils Dev', backHome: 'Accueil', refresh: 'Régénérer', passwordStrength: 'Force', strengthWeak: 'Faible', strengthFair: 'Moyen', strengthGood: 'Bon', strengthStrong: 'Fort', uppercase: 'Majuscules', lowercase: 'Minuscules', numbers: 'Chiffres', symbolsOption: 'Symboles', excludeAmbiguous: 'Exclure ambigus', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: 'Aperçu' },
}

const deDelta: DeepPartial<Translations> = {
  footer: { copyright: '© 2026 CalcMaster. Alle Rechte vorbehalten.', description: 'Kostenlose Online-Rechner', privacy: 'Datenschutz' },
  common: { language: 'Sprache', searchPlaceholder: 'Suchen... (Ctrl+K)', noResults: 'Keine Ergebnisse' },
  home: { title: 'Online-Rechner', subtitle: 'Kostenlose Online-Rechner: Einheitenumrechnung, Finanzen, Gesundheit, Entwicklertools und mehr', unitConverters: 'Umrechner', onlineCalculators: 'Rechner', devTools: 'Entwicklertools', searchPlaceholder: 'Suchen... (Ctrl+K)', noResults: 'Keine Ergebnisse', recentTools: 'Zuletzt verwendet', myFavorites: 'Favoriten' },
  converters: { length: 'Längenumrechner', weight: 'Gewichtsumrechner', temperature: 'Temperaturumrechner', area: 'Flächenumrechner', data: 'Datenumrechner', currency: 'Währungsumrechner', time: 'Zeitumrechner' },
  calculators: { mortgage: 'Hypothekenrechner', bmi: 'BMI-Rechner', discount: 'Rabattrechner', tip: 'Trinkgeldrechner', compound: 'Zinseszinsrechner', date: 'Datumsrechner', dueDate: 'Geburtstermin', babyGrowth: 'Wachstumsperzentil', percentage: 'Prozentrechner', age: 'Altersrechner', randomNumber: 'Zufallsgenerator' },
  devTools: { jsonFormatter: 'JSON-Formatierer', timestampConverter: 'Timestamp-Konverter', base64Encoder: 'Base64-Encoder', urlEncoder: 'URL-Encoder', regexTester: 'Regex-Tester', codeFormatter: 'Code-Formatierer', textDiff: 'Textvergleich', qrGenerator: 'QR-Generator', passwordGenerator: 'Passwort-Generator', colorConverter: 'Farbkonverter' },
  bmi: { title: 'BMI-Rechner', weight: 'Gewicht (kg)', height: 'Größe (cm)', underweight: 'Untergewicht', normal: 'Normal', overweight: 'Übergewicht', obese: 'Adipös' },
  tip: { title: 'Trinkgeldrechner', billAmount: 'Betrag (¥)', tipPercent: 'Trinkgeld (%)', splitCount: 'Personen', tip: 'Trinkgeld', total: 'Gesamt', perPerson: 'Pro Person' },
  discount: { title: 'Rabattrechner', originalPrice: 'Originalpreis (¥)', discountPercent: 'Rabatt (%)', finalPrice: 'Endpreis', savings: 'Ersparnis' },
  compound: { title: 'Zinseszinsrechner', principal: 'Kapital (¥)', rate: 'Zinssatz (%)', years: 'Jahre', monthlyContribution: 'Monatliche Einzahlung (¥)', futureValue: 'Endwert', totalContributions: 'Einzahlungen', totalInterest: 'Zinsen' },
  date: { title: 'Datumsrechner', startDate: 'Startdatum', endDate: 'Enddatum', totalDays: 'Gesamttage', workdays: 'Werktage', days: 'Tage' },
  dueDate: { title: 'Geburtstermin', lastPeriod: 'Letzte Periode', dueDate: 'Geburtstermin', weeksPregnant: 'Schwangerschaftswoche', remainingDays: 'Verbleibende Tage', week: 'Woche', days: 'Tage' },
  percentage: { title: 'Prozentrechner', modePercentOf: 'X% von Y?', modeWhatPercent: 'X ist wie viel % von Y?', modeChange: 'Prozentuale Änderung', value: 'Wert', percent: 'Prozent', total: 'Gesamt', result: 'Ergebnis', from: 'Von', to: 'Bis', increase: 'Zunahme', decrease: 'Abnahme' },
  ageCalc: { title: 'Altersrechner', birthDate: 'Geburtsdatum', age: 'Alter', years: 'Jahre', months: 'Monate', days: 'Tage', totalDays: 'Gesamttage', nextBirthday: 'Nächster Geburtstag', daysUntil: 'Tage', zodiac: 'Sternzeichen' },
  randomNumber: { title: 'Zufallsgenerator', min: 'Min', max: 'Max', count: 'Anzahl', unique: 'Eindeutig', generate: 'Generieren', result: 'Ergebnis', copy: 'Kopieren', copied: 'Kopiert' },
  mortgage: { title: 'Hypothekenrechner', loanAmount: 'Darlehen (¥)', interestRate: 'Zinssatz (%)', loanTerm: 'Laufzeit (Jahre)', repaymentType: 'Tilgungsart', equalPrincipalInterest: 'Annuität', equalPrincipal: 'Tilgungsdarlehen', repaymentMethod: 'Methode', monthlyPayment: 'Monatsrate', firstMonthPayment: 'Erste Rate', totalPayment: 'Gesamtzahlung', totalInterest: 'Gesamtzinsen', viewSchedule: 'Tilgungsplan', hideSchedule: 'Ausblenden', period: 'Periode', monthlyPaymentLabel: 'Rate', principal: 'Tilgung', interest: 'Zinsen', remainingPrincipal: 'Restschuld', morePeriods: '{count} weitere Perioden', lastMonthPayment: 'Letzte Rate', viewComparison: 'Vergleichen', hideComparison: 'Ausblenden', repaymentComparison: 'Vergleich', interestDifference: 'Zinsdifferenz', monthlyDecrease: 'Monatliche Abnahme' },
  devToolUI: { copy: 'Kopieren', copyResult: 'Ergebnis kopieren', clear: 'Löschen', format: 'Formatieren', compress: 'Komprimieren', encode: 'Codieren', decode: 'Decodieren', test: 'Testen', compare: 'Vergleichen', generateQR: 'QR generieren', download: 'Herunterladen', pageTitle: 'Entwicklertools', backHome: 'Startseite', refresh: 'Neu generieren', passwordStrength: 'Stärke', strengthWeak: 'Schwach', strengthFair: 'Mittel', strengthGood: 'Gut', strengthStrong: 'Stark', uppercase: 'Großbuchstaben', lowercase: 'Kleinbuchstaben', numbers: 'Ziffern', symbolsOption: 'Symbole', excludeAmbiguous: 'Mehrdeutige ausschließen', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: 'Vorschau' },
}

const ptDelta: DeepPartial<Translations> = {
  footer: { copyright: '© 2026 CalcMaster. Todos os direitos reservados.', description: 'Ferramentas de cálculo online gratuitas', privacy: 'Privacidade' },
  common: { language: 'Idioma', searchPlaceholder: 'Buscar... (Ctrl+K)', noResults: 'Nenhum resultado' },
  home: { title: 'Calculadora Online', subtitle: 'Ferramentas de cálculo gratuitas: conversão, finanças, saúde, desenvolvedor e mais', unitConverters: 'Conversores', onlineCalculators: 'Calculadoras', devTools: 'Ferramentas Dev', searchPlaceholder: 'Buscar... (Ctrl+K)', noResults: 'Nenhum resultado', recentTools: 'Recentes', myFavorites: 'Favoritos' },
  converters: { length: 'Conversor de Comprimento', weight: 'Conversor de Peso', temperature: 'Conversor de Temperatura', area: 'Conversor de Área', data: 'Conversor de Dados', currency: 'Conversor de Moeda', time: 'Conversor de Tempo' },
  calculators: { mortgage: 'Calculadora Hipotecária', bmi: 'Calculadora de IMC', discount: 'Calculadora de Desconto', tip: 'Calculadora de Gorjeta', compound: 'Juros Compostos', date: 'Calculadora de Datas', dueDate: 'Data do Parto', babyGrowth: 'Crescimento Infantil', percentage: 'Calculadora de Porcentagem', age: 'Calculadora de Idade', randomNumber: 'Gerador Aleatório' },
  devTools: { jsonFormatter: 'Formatador JSON', timestampConverter: 'Conversor Timestamp', base64Encoder: 'Codificador Base64', urlEncoder: 'Codificador URL', regexTester: 'Testador Regex', codeFormatter: 'Formatador Código', textDiff: 'Comparador Texto', qrGenerator: 'Gerador QR', passwordGenerator: 'Gerador Senha', colorConverter: 'Conversor Cor' },
  bmi: { title: 'Calculadora de IMC', weight: 'Peso (kg)', height: 'Altura (cm)', underweight: 'Abaixo do peso', normal: 'Normal', overweight: 'Sobrepeso', obese: 'Obeso' },
  tip: { title: 'Calculadora de Gorjeta', billAmount: 'Valor (¥)', tipPercent: 'Gorjeta (%)', splitCount: 'Pessoas', tip: 'Gorjeta', total: 'Total', perPerson: 'Por pessoa' },
  discount: { title: 'Calculadora de Desconto', originalPrice: 'Preço original (¥)', discountPercent: 'Desconto (%)', finalPrice: 'Preço final', savings: 'Economia' },
  compound: { title: 'Juros Compostos', principal: 'Capital (¥)', rate: 'Taxa anual (%)', years: 'Anos', monthlyContribution: 'Aporte mensal (¥)', futureValue: 'Valor futuro', totalContributions: 'Total aportes', totalInterest: 'Juros totais' },
  date: { title: 'Calculadora de Datas', startDate: 'Data início', endDate: 'Data fim', totalDays: 'Total dias', workdays: 'Dias úteis', days: 'dias' },
  dueDate: { title: 'Data do Parto', lastPeriod: 'Última menstruação', dueDate: 'Data do parto', weeksPregnant: 'Semanas', remainingDays: 'Dias restantes', week: 'Semanas', days: 'dias' },
  percentage: { title: 'Calculadora de Porcentagem', modePercentOf: 'X% de Y?', modeWhatPercent: 'X é que % de Y?', modeChange: 'Variação %', value: 'Valor', percent: 'Porcentagem', total: 'Total', result: 'Resultado', from: 'De', to: 'Para', increase: 'Aumento', decrease: 'Redução' },
  ageCalc: { title: 'Calculadora de Idade', birthDate: 'Nascimento', age: 'Idade', years: 'anos', months: 'meses', days: 'dias', totalDays: 'Total dias', nextBirthday: 'Próximo aniversário', daysUntil: 'dias', zodiac: 'Zodíaco' },
  randomNumber: { title: 'Gerador Aleatório', min: 'Mín', max: 'Máx', count: 'Qtd', unique: 'Sem repetir', generate: 'Gerar', result: 'Resultado', copy: 'Copiar', copied: 'Copiado' },
  mortgage: { title: 'Calculadora Hipotecária', loanAmount: 'Empréstimo (¥)', interestRate: 'Taxa anual (%)', loanTerm: 'Prazo (anos)', repaymentType: 'Tipo', equalPrincipalInterest: 'Prestação fixa', equalPrincipal: 'Amortização fixa', repaymentMethod: 'Método', monthlyPayment: 'Prestação', firstMonthPayment: '1ª prestação', totalPayment: 'Total pago', totalInterest: 'Juros totais', viewSchedule: 'Ver tabela', hideSchedule: 'Ocultar', period: 'Período', monthlyPaymentLabel: 'Prestação', principal: 'Capital', interest: 'Juros', remainingPrincipal: 'Saldo', morePeriods: '{count} períodos restantes', lastMonthPayment: 'Última prestação', viewComparison: 'Comparar', hideComparison: 'Ocultar', repaymentComparison: 'Comparação', interestDifference: 'Diferença', monthlyDecrease: 'Redução mensal' },
  devToolUI: { copy: 'Copiar', copyResult: 'Copiar resultado', clear: 'Limpar', format: 'Formatar', compress: 'Comprimir', encode: 'Codificar', decode: 'Decodificar', test: 'Testar', compare: 'Comparar', generateQR: 'Gerar QR', download: 'Baixar', pageTitle: 'Ferramentas Dev', backHome: 'Início', refresh: 'Regenerar', passwordStrength: 'Força', strengthWeak: 'Fraca', strengthFair: 'Média', strengthGood: 'Boa', strengthStrong: 'Forte', uppercase: 'Maiúsculas', lowercase: 'Minúsculas', numbers: 'Dígitos', symbolsOption: 'Símbolos', excludeAmbiguous: 'Excluir ambíguos', colorHex: 'HEX', colorRgb: 'RGB', colorHsl: 'HSL', colorPreview: 'Pré-visualização' },
}

function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  if (!source) return target
  const result = { ...target } as Record<string, unknown>
  for (const key of Object.keys(source as Record<string, unknown>)) {
    const sv = (source as Record<string, unknown>)[key]
    const tv = (target as Record<string, unknown>)[key]
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
      result[key] = deepMerge(tv, sv as DeepPartial<typeof tv>)
    } else if (sv !== undefined) {
      result[key] = sv
    }
  }
  return result as T
}

const es = deepMerge(en, esDelta)
const ja = deepMerge(en, jaDelta)
const ko = deepMerge(en, koDelta)
const fr = deepMerge(en, frDelta)
const de = deepMerge(en, deDelta)
const pt = deepMerge(en, ptDelta)

export { en, zh, es, ja, ko, fr, de, pt }
export type { Translations } from './en'

export const translations: Record<string, Translations> = { en, zh, es, ja, ko, fr, de, pt }
