#!/usr/bin/env python3
import json
import os

# Define all the missing keys that need to be added to each language
missing_keys = {
    "contact": {
        "form": {
            "title": {
                "fr": "Envoyez-nous un Message",
                "de": "Senden Sie uns eine Nachricht", 
                "it": "Inviaci un Messaggio",
                "pt": "Envie-nos uma Mensagem",
                "zh": "发送消息给我们",
                "ja": "メッセージを送る",
                "ko": "메시지 보내기",
                "ar": "أرسل لنا رسالة",
                "ru": "Отправьте нам сообщение",
                "hi": "हमें संदेश भेजें"
            },
            "lastName": {
                "fr": "Nom de Famille",
                "de": "Nachname",
                "it": "Cognome", 
                "pt": "Sobrenome",
                "zh": "姓氏",
                "ja": "姓",
                "ko": "성",
                "ar": "اسم العائلة",
                "ru": "Фамилия",
                "hi": "उपनाम"
            }
        },
        "info": {
            "location": {
                "fr": "Localisation",
                "de": "Standort",
                "it": "Posizione",
                "pt": "Localização", 
                "zh": "位置",
                "ja": "場所",
                "ko": "위치",
                "ar": "الموقع",
                "ru": "Местоположение",
                "hi": "स्थान"
            },
            "phone": {
                "fr": "Téléphone",
                "de": "Telefon",
                "it": "Telefono",
                "pt": "Telefone",
                "zh": "电话",
                "ja": "電話",
                "ko": "전화",
                "ar": "الهاتف", 
                "ru": "Телефон",
                "hi": "फोन"
            }
        },
        "hours": {
            "title": {
                "fr": "Heures d'Ouverture",
                "de": "Geschäftszeiten",
                "it": "Orari di Apertura",
                "pt": "Horário de Funcionamento",
                "zh": "营业时间",
                "ja": "営業時間",
                "ko": "영업시간",
                "ar": "ساعات العمل",
                "ru": "Часы работы",
                "hi": "कार्य समय"
            },
            "weekdays": {
                "fr": "Lundi - Vendredi",
                "de": "Montag - Freitag",
                "it": "Lunedì - Venerdì",
                "pt": "Segunda - Sexta",
                "zh": "周一 - 周五",
                "ja": "月曜日 - 金曜日",
                "ko": "월요일 - 금요일",
                "ar": "الاثنين - الجمعة",
                "ru": "Понедельник - Пятница",
                "hi": "सोमवार - शुक्रवार"
            },
            "saturday": {
                "fr": "Samedi",
                "de": "Samstag", 
                "it": "Sabato",
                "pt": "Sábado",
                "zh": "周六",
                "ja": "土曜日",
                "ko": "토요일",
                "ar": "السبت",
                "ru": "Суббота",
                "hi": "शनिवार"
            },
            "sunday": {
                "fr": "Dimanche",
                "de": "Sonntag",
                "it": "Domenica", 
                "pt": "Domingo",
                "zh": "周日",
                "ja": "日曜日",
                "ko": "일요일",
                "ar": "الأحد",
                "ru": "Воскресенье",
                "hi": "रविवार"
            },
            "closed": {
                "fr": "Fermé",
                "de": "Geschlossen",
                "it": "Chiuso",
                "pt": "Fechado",
                "zh": "关闭",
                "ja": "閉店",
                "ko": "휴무",
                "ar": "مغلق",
                "ru": "Закрыто",
                "hi": "बंद"
            }
        },
        "chat": {
            "description": {
                "fr": "Besoin d'aide immédiate? Notre support de chat en direct est disponible 24/7 pour vous aider avec toutes vos questions.",
                "de": "Benötigen Sie sofortige Hilfe? Unser Live-Chat-Support ist 24/7 verfügbar, um Ihnen bei allen Fragen zu helfen.",
                "it": "Hai bisogno di assistenza immediata? Il nostro supporto chat dal vivo è disponibile 24/7 per aiutarti con qualsiasi domanda.",
                "pt": "Precisa de assistência imediata? Nosso suporte de chat ao vivo está disponível 24/7 para ajudar com qualquer dúvida.",
                "zh": "需要立即帮助吗？我们的在线客服支持24/7全天候为您解答任何问题。",
                "ja": "即座のサポートが必要ですか？私たちのライブチャットサポートは24時間年中無休でご質問にお答えします。",
                "ko": "즉시 도움이 필요하신가요? 저희 라이브 채팅 지원은 24/7 언제든지 질문에 답변드립니다.",
                "ar": "هل تحتاج إلى مساعدة فورية؟ دعم الدردشة المباشرة متاح على مدار الساعة طوال أيام الأسبوع للمساعدة في أي أسئلة.",
                "ru": "Нужна немедленная помощь? Наша поддержка в реальном времени доступна 24/7 для помощи с любыми вопросами.",
                "hi": "तत्काल सहायता की आवश्यकता है? हमारा लाइव चैट सपोर्ट 24/7 उपलब्ध है किसी भी प्रश्न में मदद के लिए।"
            },
            "openChat": {
                "fr": "Ouvrir le Chat en Direct",
                "de": "Live-Chat Öffnen",
                "it": "Apri Chat dal Vivo",
                "pt": "Abrir Chat ao Vivo", 
                "zh": "打开在线客服",
                "ja": "ライブチャットを開く",
                "ko": "라이브 채팅 열기",
                "ar": "فتح الدردشة المباشرة",
                "ru": "Открыть живой чат",
                "hi": "लाइव चैट खोलें"
            },
            "support": {
                "fr": "Support en Direct",
                "de": "Live-Support",
                "it": "Supporto dal Vivo",
                "pt": "Suporte ao Vivo",
                "zh": "在线支持",
                "ja": "ライブサポート", 
                "ko": "라이브 지원",
                "ar": "الدعم المباشر",
                "ru": "Живая поддержка",
                "hi": "लाइव सपोर्ट"
            },
            "greeting": {
                "fr": "Bonjour! Comment pouvons-nous vous aider aujourd'hui?",
                "de": "Hallo! Wie können wir Ihnen heute helfen?",
                "it": "Ciao! Come possiamo aiutarti oggi?",
                "pt": "Olá! Como podemos ajudá-lo hoje?",
                "zh": "您好！今天我们如何为您提供帮助？",
                "ja": "こんにちは！今日はどのようにお手伝いできますか？",
                "ko": "안녕하세요! 오늘 어떻게 도움을 드릴까요?",
                "ar": "مرحبا! كيف يمكننا مساعدتك اليوم؟",
                "ru": "Привет! Как мы можем помочь вам сегодня?",
                "hi": "नमस्ते! आज हम आपकी कैसे मदद कर सकते हैं?"
            },
            "sampleMessage": {
                "fr": "J'ai une question sur mon compte",
                "de": "Ich habe eine Frage zu meinem Konto",
                "it": "Ho una domanda sul mio account",
                "pt": "Tenho uma pergunta sobre minha conta",
                "zh": "我对我的账户有疑问",
                "ja": "アカウントについて質問があります",
                "ko": "계정에 대한 질문이 있습니다",
                "ar": "لدي سؤال حول حسابي",
                "ru": "У меня есть вопрос о моем аккаунте",
                "hi": "मेरे खाते के बारे में सवाल है"
            },
            "response": {
                "fr": "Merci de nous avoir contactés! Notre équipe vous aidera sous peu.",
                "de": "Vielen Dank für Ihre Kontaktaufnahme! Unser Team wird Ihnen in Kürze helfen.",
                "it": "Grazie per averci contattato! Il nostro team ti aiuterà a breve.",
                "pt": "Obrigado por entrar em contato! Nossa equipe o ajudará em breve.",
                "zh": "感谢您联系我们！我们的团队将很快为您提供帮助。",
                "ja": "お問い合わせありがとうございます！チームが間もなくお手伝いします。",
                "ko": "연락 주셔서 감사합니다! 저희 팀이 곧 도움을 드릴 것입니다.",
                "ar": "شكرا لتواصلك معنا! فريقنا سيساعدك قريبا.",
                "ru": "Спасибо за обращение! Наша команда поможет вам в ближайшее время.",
                "hi": "संपर्क करने के लिए धन्यवाद! हमारी टीम जल्द ही आपकी मदद करेगी।"
            }
        }
    },
    "dashboard": {
        "plans": {
            "currentPlan": {
                "fr": "Votre Plan Actuel",
                "de": "Ihr Aktueller Plan",
                "it": "Il Tuo Piano Attuale",
                "pt": "Seu Plano Atual",
                "zh": "您的当前计划",
                "ja": "あなたの現在のプラン",
                "ko": "현재 플랜",
                "ar": "خطتك الحالية",
                "ru": "Ваш Текущий План",
                "hi": "आपकी वर्तमान योजना"
            },
            "active": {
                "fr": "Actif",
                "de": "Aktiv",
                "it": "Attivo",
                "pt": "Ativo",
                "zh": "活跃",
                "ja": "アクティブ",
                "ko": "활성",
                "ar": "نشط",
                "ru": "Активный",
                "hi": "सक्रिय"
            },
            "mostPopular": {
                "fr": "Plus Populaire",
                "de": "Beliebteste",
                "it": "Più Popolare",
                "pt": "Mais Popular",
                "zh": "最受欢迎",
                "ja": "最も人気",
                "ko": "가장 인기",
                "ar": "الأكثر شعبية",
                "ru": "Самый Популярный",
                "hi": "सबसे लोकप्रिय"
            },
            "investmentAmount": {
                "fr": "Montant d'Investissement",
                "de": "Investitionsbetrag",
                "it": "Importo dell'Investimento",
                "pt": "Valor do Investimento",
                "zh": "投资金额",
                "ja": "投資額",
                "ko": "투자 금액",
                "ar": "مبلغ الاستثمار",
                "ru": "Сумма Инвестиций",
                "hi": "निवेश राशि"
            }
        },
        "market": {
            "searchMarkets": {
                "fr": "Rechercher des marchés...",
                "de": "Märkte suchen...",
                "it": "Cerca mercati...",
                "pt": "Buscar mercados...",
                "zh": "搜索市场...",
                "ja": "マーケットを検索...",
                "ko": "마켓 검색...",
                "ar": "البحث في الأسواق...",
                "ru": "Поиск рынков...",
                "hi": "बाजार खोजें..."
            },
            "pair": {
                "fr": "Paire",
                "de": "Paar",
                "it": "Coppia",
                "pt": "Par",
                "zh": "交易对",
                "ja": "ペア",
                "ko": "페어",
                "ar": "زوج",
                "ru": "Пара",
                "hi": "जोड़ी"
            },
            "action": {
                "fr": "Action",
                "de": "Aktion",
                "it": "Azione",
                "pt": "Ação",
                "zh": "操作",
                "ja": "アクション",
                "ko": "액션",
                "ar": "إجراء",
                "ru": "Действие",
                "hi": "कार्य"
            },
            "high24h": {
                "fr": "Max 24h",
                "de": "24h Hoch",
                "it": "Max 24h",
                "pt": "Máx 24h",
                "zh": "24小时最高",
                "ja": "24時間高値",
                "ko": "24시간 최고",
                "ar": "أعلى 24 ساعة",
                "ru": "Макс 24ч",
                "hi": "24 घंटे उच्च"
            },
            "low24h": {
                "fr": "Min 24h",
                "de": "24h Tief",
                "it": "Min 24h",
                "pt": "Mín 24h",
                "zh": "24小时最低",
                "ja": "24時間安値",
                "ko": "24시간 최저",
                "ar": "أدنى 24 ساعة",
                "ru": "Мин 24ч",
                "hi": "24 घंटे निम्न"
            },
            "bitcoinChart": {
                "fr": "Graphique Bitcoin",
                "de": "Bitcoin Chart",
                "it": "Grafico Bitcoin",
                "pt": "Gráfico Bitcoin",
                "zh": "比特币图表",
                "ja": "ビットコインチャート",
                "ko": "비트코인 차트",
                "ar": "مخطط البيتكوين",
                "ru": "График Bitcoin",
                "hi": "बिटकॉइन चार्ट"
            },
            "ethereumChart": {
                "fr": "Graphique Ethereum",
                "de": "Ethereum Chart",
                "it": "Grafico Ethereum",
                "pt": "Gráfico Ethereum",
                "zh": "以太坊图表",
                "ja": "イーサリアムチャート",
                "ko": "이더리움 차트",
                "ar": "مخطط الإيثيريوم",
                "ru": "График Ethereum",
                "hi": "एथेरियम चार्ट"
            }
        },
        "deposit": {
            
        }
    },
    "auth": {
        "login": {
            "username": {
                "fr": "Nom d'utilisateur",
                "de": "Benutzername",
                "it": "Nome utente",
                "pt": "Nome de usuário",
                "zh": "用户名",
                "ja": "ユーザー名",
                "ko": "사용자명",
                "ar": "اسم المستخدم",
                "ru": "Имя пользователя",
                "hi": "उपयोगकर्ता नाम"
            },
            "usernamePlaceholder": {
                "fr": "Entrez votre nom d'utilisateur",
                "de": "Geben Sie Ihren Benutzernamen ein",
                "it": "Inserisci il tuo nome utente",
                "pt": "Digite seu nome de usuário",
                "zh": "输入您的用户名",
                "ja": "ユーザー名を入力",
                "ko": "사용자명을 입력하세요",
                "ar": "أدخل اسم المستخدم",
                "ru": "Введите ваше имя пользователя",
                "hi": "अपना उपयोगकर्ता नाम दर्ज करें"
            },
            "passwordPlaceholder": {
                "fr": "Entrez votre mot de passe",
                "de": "Geben Sie Ihr Passwort ein",
                "it": "Inserisci la tua password",
                "pt": "Digite sua senha",
                "zh": "输入您的密码",
                "ja": "パスワードを入力",
                "ko": "비밀번호를 입력하세요",
                "ar": "أدخل كلمة المرور",
                "ru": "Введите ваш пароль",
                "hi": "अपना पासवर्ड दर्ज करें"
            },
            "signIn": {
                "fr": "Se Connecter",
                "de": "Anmelden",
                "it": "Accedi",
                "pt": "Entrar",
                "zh": "登录",
                "ja": "サインイン",
                "ko": "로그인",
                "ar": "تسجيل الدخول",
                "ru": "Войти",
                "hi": "साइन इन"
            },
            "signingIn": {
                "fr": "Connexion...",
                "de": "Anmeldung...",
                "it": "Accesso...",
                "pt": "Entrando...",
                "zh": "登录中...",
                "ja": "サインイン中...",
                "ko": "로그인 중...",
                "ar": "جاري تسجيل الدخول...",
                "ru": "Вход...",
                "hi": "साइन इन हो रहा है..."
            },
            "signUpHere": {
                "fr": "Inscrivez-vous ici",
                "de": "Hier registrieren",
                "it": "Registrati qui",
                "pt": "Cadastre-se aqui",
                "zh": "在这里注册",
                "ja": "こちらでサインアップ",
                "ko": "여기서 가입하세요",
                "ar": "سجل هنا",
                "ru": "Зарегистрируйтесь здесь",
                "hi": "यहाँ साइन अप करें"
            },
            "backToHome": {
                "fr": "Retour à l'Accueil",
                "de": "Zurück zur Startseite",
                "it": "Torna alla Home",
                "pt": "Voltar ao Início",
                "zh": "返回首页",
                "ja": "ホームに戻る",
                "ko": "홈으로 돌아가기",
                "ar": "العودة إلى الصفحة الرئيسية",
                "ru": "Вернуться на главную",
                "hi": "होम पर वापस जाएं"
            }
        }
    }
}

def deep_merge(target, source):
    """Deep merge two dictionaries"""
    for key, value in source.items():
        if key in target and isinstance(target[key], dict) and isinstance(value, dict):
            deep_merge(target[key], value)
        else:
            target[key] = value

def add_missing_keys(lang_data, missing_data, lang_code):
    """Add missing keys to language data"""
    for section, section_data in missing_data.items():
        if section not in lang_data:
            lang_data[section] = {}
        
        def process_nested(target, source, prefix=""):
            for key, value in source.items():
                if isinstance(value, dict):
                    if lang_code in value:
                        # This is a translation value
                        target[key] = value[lang_code]
                    else:
                        # This is a nested structure
                        if key not in target:
                            target[key] = {}
                        process_nested(target[key], value, f"{prefix}.{key}")
        
        process_nested(lang_data[section], section_data)

# Language codes to update
languages = ['fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'ru', 'hi']

for lang in languages:
    file_path = f'src/i18n/locales/{lang}.json'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lang_data = json.load(f)
        
        add_missing_keys(lang_data, missing_keys, lang)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(lang_data, f, ensure_ascii=False, indent=2)
        
        print(f"Updated {lang}.json successfully")
    
    except Exception as e:
        print(f"Error updating {lang}.json: {e}")

print("Translation update complete!")