#!/usr/bin/env python3
import json
import os

# Define the complete admin translation keys
admin_complete_keys = {
    "admin": {
        "dashboard": {
            "subtitle": {
                "es": "Resumen de tu sistema",
                "fr": "Aperçu de votre système",
                "zh": "系统概览",
                "de": "Übersicht über Ihr System",
                "it": "Panoramica del tuo sistema",
                "pt": "Visão geral do seu sistema",
                "ja": "システムの概要",
                "ko": "시스템 개요",
                "ar": "نظرة عامة على نظامك",
                "ru": "Обзор вашей системы",
                "hi": "आपके सिस्टम का अवलोकन"
            },
            "totalTransactions": {
                "es": "Total de Transacciones",
                "fr": "Total des Transactions",
                "zh": "总交易数",
                "de": "Transaktionen Gesamt",
                "it": "Totale Transazioni",
                "pt": "Total de Transações",
                "ja": "総取引数",
                "ko": "총 거래수",
                "ar": "إجمالي المعاملات",
                "ru": "Всего транзакций",
                "hi": "कुल लेनदेन"
            },
            "completedTransactions": {
                "es": "Transacciones Completadas",
                "fr": "Transactions Terminées",
                "zh": "已完成交易",
                "de": "Abgeschlossene Transaktionen",
                "it": "Transazioni Completate",
                "pt": "Transações Completadas",
                "ja": "完了した取引",
                "ko": "완료된 거래",
                "ar": "المعاملات المكتملة",
                "ru": "Завершенные транзакции",
                "hi": "पूर्ण लेनदेन"
            },
            "rejectedTransactions": {
                "es": "Transacciones Rechazadas",
                "fr": "Transactions Rejetées",
                "zh": "被拒绝的交易",
                "de": "Abgelehnte Transaktionen",
                "it": "Transazioni Rifiutate",
                "pt": "Transações Rejeitadas",
                "ja": "拒否された取引",
                "ko": "거부된 거래",
                "ar": "المعاملات المرفوضة",
                "ru": "Отклоненные транзакции",
                "hi": "अस्वीकृत लेनदेन"
            },
            "newUsersWeek": {
                "es": "+12% desde la semana pasada",
                "fr": "+12% depuis la semaine dernière",
                "zh": "比上周增长+12%",
                "de": "+12% seit letzter Woche",
                "it": "+12% dalla settimana scorsa",
                "pt": "+12% da semana passada",
                "ja": "先週から+12%",
                "ko": "지난 주 대비 +12%",
                "ar": "+12% منذ الأسبوع الماضي",
                "ru": "+12% с прошлой недели",
                "hi": "पिछले सप्ताह से +12%"
            },
            "monthlyGrowth": {
                "es": "+8% desde el mes pasado",
                "fr": "+8% depuis le mois dernier",
                "zh": "比上月增长+8%",
                "de": "+8% seit letztem Monat",
                "it": "+8% dal mese scorso",
                "pt": "+8% do mês passado",
                "ja": "先月から+8%",
                "ko": "지난 달 대비 +8%",
                "ar": "+8% منذ الشهر الماضي",
                "ru": "+8% с прошлого месяца",
                "hi": "पिछले महीने से +8%"
            },
            "depositsGrowth": {
                "es": "+15% desde el mes pasado",
                "fr": "+15% depuis le mois dernier",
                "zh": "比上月增长+15%",
                "de": "+15% seit letztem Monat",
                "it": "+15% dal mese scorso",
                "pt": "+15% do mês passado",
                "ja": "先月から+15%",
                "ko": "지난 달 대비 +15%",
                "ar": "+15% منذ الشهر الماضي",
                "ru": "+15% с прошлого месяца",
                "hi": "पिछले महीने से +15%"
            },
            "withdrawalsChange": {
                "es": "+5% desde el mes pasado",
                "fr": "+5% depuis le mois dernier",
                "zh": "比上月增长+5%",
                "de": "+5% seit letztem Monat",
                "it": "+5% dal mese scorso",
                "pt": "+5% do mês passado",
                "ja": "先月から+5%",
                "ko": "지난 달 대비 +5%",
                "ar": "+5% منذ الشهر الماضي",
                "ru": "+5% с прошлого месяца",
                "hi": "पिछले महीने से +5%"
            },
            "requiresAttention": {
                "es": "Requiere atención",
                "fr": "Nécessite une attention",
                "zh": "需要关注",
                "de": "Erfordert Aufmerksamkeit",
                "it": "Richiede attenzione",
                "pt": "Requer atenção",
                "ja": "注意が必要",
                "ko": "주의 필요",
                "ar": "يتطلب الانتباه",
                "ru": "Требует внимания",
                "hi": "ध्यान की आवश्यकता"
            },
            "successfullyProcessed": {
                "es": "Procesadas exitosamente",
                "fr": "Traitées avec succès",
                "zh": "成功处理",
                "de": "Erfolgreich verarbeitet",
                "it": "Elaborate con successo",
                "pt": "Processadas com sucesso",
                "ja": "正常に処理済み",
                "ko": "성공적으로 처리됨",
                "ar": "تمت المعالجة بنجاح",
                "ru": "Успешно обработаны",
                "hi": "सफलतापूर्वक संसाधित"
            },
            "failedTransactions": {
                "es": "Transacciones fallidas",
                "fr": "Transactions échouées",
                "zh": "失败的交易",
                "de": "Fehlgeschlagene Transaktionen",
                "it": "Transazioni fallite",
                "pt": "Transações falhadas",
                "ja": "失敗した取引",
                "ko": "실패한 거래",
                "ar": "المعاملات الفاشلة",
                "ru": "Неудачные транзакции",
                "hi": "असफल लेनदेन"
            },
            "recentTransactions": {
                "es": "Transacciones Recientes",
                "fr": "Transactions Récentes",
                "zh": "最近交易",
                "de": "Neueste Transaktionen",
                "it": "Transazioni Recenti",
                "pt": "Transações Recentes",
                "ja": "最近の取引",
                "ko": "최근 거래",
                "ar": "المعاملات الأخيرة",
                "ru": "Последние транзакции",
                "hi": "हाल के लेनदेन"
            }
        },
        "users": {
            "subtitle": {
                "es": "Gestionar cuentas de usuario y monitorear actividad",
                "fr": "Gérer les comptes utilisateur et surveiller l'activité",
                "zh": "管理用户账户和监控活动",
                "de": "Benutzerkonten verwalten und Aktivitäten überwachen",
                "it": "Gestisci account utente e monitora l'attività",
                "pt": "Gerenciar contas de usuário e monitorar atividade",
                "ja": "ユーザーアカウントの管理とアクティビティの監視",
                "ko": "사용자 계정 관리 및 활동 모니터링",
                "ar": "إدارة حسابات المستخدمين ومراقبة النشاط",
                "ru": "Управление учетными записями пользователей и мониторинг активности",
                "hi": "उपयोगकर्ता खातों का प्रबंधन और गतिविधि की निगरानी"
            },
            "totalUsers": {
                "es": "Total de Usuarios",
                "fr": "Total des Utilisateurs",
                "zh": "用户总数",
                "de": "Benutzer Gesamt",
                "it": "Totale Utenti",
                "pt": "Total de Usuários",
                "ja": "ユーザー総数",
                "ko": "총 사용자수",
                "ar": "إجمالي المستخدمين",
                "ru": "Всего пользователей",
                "hi": "कुल उपयोगकर्ता"
            },
            "filterUsers": {
                "es": "Filtrar Usuarios",
                "fr": "Filtrer les Utilisateurs",
                "zh": "筛选用户",
                "de": "Benutzer Filtern",
                "it": "Filtra Utenti",
                "pt": "Filtrar Usuários",
                "ja": "ユーザーをフィルター",
                "ko": "사용자 필터링",
                "ar": "تصفية المستخدمين",
                "ru": "Фильтр пользователей",
                "hi": "उपयोगकर्ताओं को फ़िल्टर करें"
            },
            "searchPlaceholder": {
                "es": "Buscar por nombre de usuario, nombre o email...",
                "fr": "Rechercher par nom d'utilisateur, nom ou email...",
                "zh": "按用户名、姓名或邮箱搜索...",
                "de": "Nach Benutzername, Name oder E-Mail suchen...",
                "it": "Cerca per nome utente, nome o email...",
                "pt": "Procurar por nome de usuário, nome ou email...",
                "ja": "ユーザー名、名前、メールで検索...",
                "ko": "사용자명, 이름, 이메일로 검색...",
                "ar": "البحث بالاسم المستخدم أو الاسم أو البريد الإلكتروني...",
                "ru": "Поиск по имени пользователя, имени или email...",
                "hi": "उपयोगकर्ता नाम, नाम या ईमेल से खोजें..."
            },
            "usersList": {
                "es": "Lista de Usuarios ({{count}})",
                "fr": "Liste des Utilisateurs ({{count}})",
                "zh": "用户列表 ({{count}})",
                "de": "Benutzerliste ({{count}})",
                "it": "Elenco Utenti ({{count}})",
                "pt": "Lista de Usuários ({{count}})",
                "ja": "ユーザーリスト ({{count}})",
                "ko": "사용자 목록 ({{count}})",
                "ar": "قائمة المستخدمين ({{count}})",
                "ru": "Список пользователей ({{count}})",
                "hi": "उपयोगकर्ता सूची ({{count}})"
            },
            "balance": {
                "es": "Saldo",
                "fr": "Solde",
                "zh": "余额",
                "de": "Guthaben",
                "it": "Saldo",
                "pt": "Saldo",
                "ja": "残高",
                "ko": "잔액",
                "ar": "الرصيد",
                "ru": "Баланс",
                "hi": "शेष राशि"
            }
        },
        "transactions": {
            "subtitle": {
                "es": "Gestionar y aprobar todas las transacciones de la plataforma",
                "fr": "Gérer et approuver toutes les transactions de la plateforme",
                "zh": "管理和批准所有平台交易",
                "de": "Alle Plattform-Transaktionen verwalten und genehmigen",
                "it": "Gestisci e approva tutte le transazioni della piattaforma",
                "pt": "Gerenciar e aprovar todas as transações da plataforma",
                "ja": "プラットフォームの全取引を管理・承認",
                "ko": "모든 플랫폼 거래 관리 및 승인",
                "ar": "إدارة والموافقة على جميع معاملات المنصة",
                "ru": "Управление и одобрение всех транзакций платформы",
                "hi": "सभी प्लेटफ़ॉर्म लेनदेन का प्रबंधन और अनुमोदन"
            },
            "total": {
                "es": "Total",
                "fr": "Total",
                "zh": "总计",
                "de": "Gesamt",
                "it": "Totale",
                "pt": "Total",
                "ja": "合計",
                "ko": "총계",
                "ar": "المجموع",
                "ru": "Всего",
                "hi": "कुल"
            },
            "filterTransactions": {
                "es": "Filtrar Transacciones",
                "fr": "Filtrer les Transactions",
                "zh": "筛选交易",
                "de": "Transaktionen Filtern",
                "it": "Filtra Transazioni",
                "pt": "Filtrar Transações",
                "ja": "取引をフィルター",
                "ko": "거래 필터링",
                "ar": "تصفية المعاملات",
                "ru": "Фильтр транзакций",
                "hi": "लेनदेन फ़िल्टर करें"
            },
            "searchPlaceholder": {
                "es": "Buscar por usuario, tipo o criptomoneda...",
                "fr": "Rechercher par utilisateur, type ou cryptomonnaie...",
                "zh": "按用户、类型或加密货币搜索...",
                "de": "Nach Benutzer, Typ oder Kryptowährung suchen...",
                "it": "Cerca per utente, tipo o criptovaluta...",
                "pt": "Procurar por usuário, tipo ou criptomoeda...",
                "ja": "ユーザー、タイプ、暗号通貨で検索...",
                "ko": "사용자, 유형, 암호화폐로 검색...",
                "ar": "البحث بالمستخدم أو النوع أو العملة المشفرة...",
                "ru": "Поиск по пользователю, типу или криптовалюте...",
                "hi": "उपयोगकर्ता, प्रकार या क्रिप्टोकरेंसी से खोजें..."
            },
            "allTypes": {
                "es": "Todos los Tipos",
                "fr": "Tous les Types",
                "zh": "所有类型",
                "de": "Alle Typen",
                "it": "Tutti i Tipi",
                "pt": "Todos os Tipos",
                "ja": "すべてのタイプ",
                "ko": "모든 유형",
                "ar": "جميع الأنواع",
                "ru": "Все типы",
                "hi": "सभी प्रकार"
            },
            "allStatus": {
                "es": "Todos los Estados",
                "fr": "Tous les Statuts",
                "zh": "所有状态",
                "de": "Alle Status",
                "it": "Tutti gli Stati",
                "pt": "Todos os Status",
                "ja": "すべてのステータス",
                "ko": "모든 상태",
                "ar": "جميع الحالات",
                "ru": "Все статусы",
                "hi": "सभी स्थितियां"
            },
            "deposit": {
                "es": "Depósito",
                "fr": "Dépôt",
                "zh": "存款",
                "de": "Einzahlung",
                "it": "Deposito",
                "pt": "Depósito",
                "ja": "入金",
                "ko": "입금",
                "ar": "إيداع",
                "ru": "Депозит",
                "hi": "जमा"
            },
            "withdrawal": {
                "es": "Retiro",
                "fr": "Retrait",
                "zh": "提款",
                "de": "Auszahlung",
                "it": "Prelievo",
                "pt": "Saque",
                "ja": "出金",
                "ko": "출금",
                "ar": "سحب",
                "ru": "Вывод",
                "hi": "निकासी"
            },
            "pending": {
                "es": "Pendiente",
                "fr": "En Attente",
                "zh": "待处理",
                "de": "Ausstehend",
                "it": "In Sospeso",
                "pt": "Pendente",
                "ja": "保留中",
                "ko": "대기 중",
                "ar": "في الانتظار",
                "ru": "В ожидании",
                "hi": "लंबित"
            },
            "completed": {
                "es": "Completado",
                "fr": "Terminé",
                "zh": "已完成",
                "de": "Abgeschlossen",
                "it": "Completato",
                "pt": "Completado",
                "ja": "完了",
                "ko": "완료",
                "ar": "مكتمل",
                "ru": "Завершено",
                "hi": "पूर्ण"
            },
            "rejected": {
                "es": "Rechazado",
                "fr": "Rejeté",
                "zh": "已拒绝",
                "de": "Abgelehnt",
                "it": "Rifiutato",
                "pt": "Rejeitado",
                "ja": "拒否",
                "ko": "거부됨",
                "ar": "مرفوض",
                "ru": "Отклонено",
                "hi": "अस्वीकृत"
            },
            "transactionsList": {
                "es": "Lista de Transacciones ({{count}})",
                "fr": "Liste des Transactions ({{count}})",
                "zh": "交易列表 ({{count}})",
                "de": "Transaktionsliste ({{count}})",
                "it": "Elenco Transazioni ({{count}})",
                "pt": "Lista de Transações ({{count}})",
                "ja": "取引リスト ({{count}})",
                "ko": "거래 목록 ({{count}})",
                "ar": "قائمة المعاملات ({{count}})",
                "ru": "Список транзакций ({{count}})",
                "hi": "लेनदेन सूची ({{count}})"
            },
            "approved": {
                "es": "Transacción Aprobada",
                "fr": "Transaction Approuvée",
                "zh": "交易已批准",
                "de": "Transaktion Genehmigt",
                "it": "Transazione Approvata",
                "pt": "Transação Aprovada",
                "ja": "取引が承認されました",
                "ko": "거래 승인됨",
                "ar": "تمت الموافقة على المعاملة",
                "ru": "Транзакция одобрена",
                "hi": "लेनदेन अनुमोदित"
            },
            "markedCompleted": {
                "es": "La transacción ha sido marcada como completada",
                "fr": "La transaction a été marquée comme terminée",
                "zh": "交易已标记为完成",
                "de": "Die Transaktion wurde als abgeschlossen markiert",
                "it": "La transazione è stata contrassegnata come completata",
                "pt": "A transação foi marcada como concluída",
                "ja": "取引が完了としてマークされました",
                "ko": "거래가 완료로 표시되었습니다",
                "ar": "تم وضع علامة على المعاملة كمكتملة",
                "ru": "Транзакция отмечена как завершенная",
                "hi": "लेनदेन को पूर्ण के रूप में चिह्नित किया गया है"
            },
            "hasBeenRejected": {
                "es": "La transacción ha sido rechazada",
                "fr": "La transaction a été rejetée",
                "zh": "交易已被拒绝",
                "de": "Die Transaktion wurde abgelehnt",
                "it": "La transazione è stata rifiutata",
                "pt": "A transação foi rejeitada",
                "ja": "取引が拒否されました",
                "ko": "거래가 거부되었습니다",
                "ar": "تم رفض المعاملة",
                "ru": "Транзакция была отклонена",
                "hi": "लेनदेन को अस्वीकार कर दिया गया है"
            },
            "downloadingReceipt": {
                "es": "Descargando Recibo",
                "fr": "Téléchargement du Reçu",
                "zh": "正在下载收据",
                "de": "Beleg wird heruntergeladen",
                "it": "Scaricamento Ricevuta",
                "pt": "Baixando Recibo",
                "ja": "レシートをダウンロード中",
                "ko": "영수증 다운로드 중",
                "ar": "تحميل الإيصال",
                "ru": "Загрузка квитанции",
                "hi": "रसीद डाउनलोड कर रहे हैं"
            },
            "receiptFor": {
                "es": "Recibo para la transacción de {{user}}",
                "fr": "Reçu pour la transaction de {{user}}",
                "zh": "{{user}} 的交易收据",
                "de": "Beleg für {{user}} Transaktion",
                "it": "Ricevuta per la transazione di {{user}}",
                "pt": "Recibo para transação de {{user}}",
                "ja": "{{user}} の取引レシート",
                "ko": "{{user}} 거래 영수증",
                "ar": "إيصال لمعاملة {{user}}",
                "ru": "Квитанция для транзакции {{user}}",
                "hi": "{{user}} लेनदेन के लिए रसीद"
            }
        }
    },
    "common": {
        "status": {
            "active": {
                "es": "Activo",
                "fr": "Actif",
                "zh": "活跃",
                "de": "Aktiv",
                "it": "Attivo",
                "pt": "Ativo",
                "ja": "アクティブ",
                "ko": "활성",
                "ar": "نشط",
                "ru": "Активный",
                "hi": "सक्रिय"
            },
            "inactive": {
                "es": "Inactivo",
                "fr": "Inactif",
                "zh": "非活跃",
                "de": "Inaktiv",
                "it": "Inattivo",
                "pt": "Inativo",
                "ja": "非アクティブ",
                "ko": "비활성",
                "ar": "غير نشط",
                "ru": "Неактивный",
                "hi": "निष्क्रिय"
            },
            "suspended": {
                "es": "Suspendido",
                "fr": "Suspendu",
                "zh": "已暂停",
                "de": "Gesperrt",
                "it": "Sospeso",
                "pt": "Suspenso",
                "ja": "停止中",
                "ko": "정지됨",
                "ar": "معلق",
                "ru": "Приостановлен",
                "hi": "निलंबित"
            },
            "pending": {
                "es": "Pendiente",
                "fr": "En Attente",
                "zh": "待处理",
                "de": "Ausstehend",
                "it": "In Sospeso",
                "pt": "Pendente",
                "ja": "保留中",
                "ko": "대기 중",
                "ar": "في الانتظار",
                "ru": "В ожидании",
                "hi": "लंबित"
            },
            "completed": {
                "es": "Completado",
                "fr": "Terminé",
                "zh": "已完成",
                "de": "Abgeschlossen",
                "it": "Completato",
                "pt": "Completado",
                "ja": "完了",
                "ko": "완료",
                "ar": "مكتمل",
                "ru": "Завершено",
                "hi": "पूर्ण"
            },
            "rejected": {
                "es": "Rechazado",
                "fr": "Rejeté",
                "zh": "已拒绝",
                "de": "Abgelehnt",
                "it": "Rifiutato",
                "pt": "Rejeitado",
                "ja": "拒否",
                "ko": "거부됨",
                "ar": "مرفوض",
                "ru": "Отклонено",
                "hi": "अस्वीकृत"
            }
        }
    }
}

def update_language_file(lang_code):
    file_path = f"src/i18n/locales/{lang_code}.json"
    
    if not os.path.exists(file_path):
        print(f"Warning: {file_path} does not exist")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Ensure admin section exists
    if "admin" not in data:
        data["admin"] = {}
    
    # Ensure common section exists  
    if "common" not in data:
        data["common"] = {}
    
    # Update admin dashboard keys
    if "dashboard" not in data["admin"]:
        data["admin"]["dashboard"] = {}
    
    for key, translations in admin_complete_keys["admin"]["dashboard"].items():
        if lang_code in translations:
            data["admin"]["dashboard"][key] = translations[lang_code]
    
    # Update admin users keys
    if "users" not in data["admin"]:
        data["admin"]["users"] = {}
    
    for key, translations in admin_complete_keys["admin"]["users"].items():
        if lang_code in translations:
            data["admin"]["users"][key] = translations[lang_code]
    
    # Update admin transactions keys
    if "transactions" not in data["admin"]:
        data["admin"]["transactions"] = {}
    
    for key, translations in admin_complete_keys["admin"]["transactions"].items():
        if lang_code in translations:
            data["admin"]["transactions"][key] = translations[lang_code]
    
    # Update common status keys
    if "status" not in data["common"]:
        data["common"]["status"] = {}
    
    for key, translations in admin_complete_keys["common"]["status"].items():
        if lang_code in translations:
            data["common"]["status"][key] = translations[lang_code]
    
    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {lang_code}.json with complete admin translations")

# Update all language files except English (already updated)
languages_to_update = ["es", "fr", "zh", "de", "it", "pt", "ja", "ko", "ar", "ru", "hi"]

for lang in languages_to_update:
    update_language_file(lang)

print("All admin pages are now production-ready for translation!")