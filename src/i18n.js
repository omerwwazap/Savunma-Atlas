import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "about": {
                        "title": "About Us",
                        "cardTitle": "Military Projects Hub",
                        "paragraph1": "Military Projects Hub is your central resource for information on cutting-edge military projects and the latest defense news from around the world.",
                        "paragraph2": "Our mission is to provide accurate, up-to-date information on military technology, research, and development to keep you informed about global defense advancements.",
                        "paragraph3": "Whether you're a defense professional, researcher, or enthusiast, Military Projects Hub offers valuable insights into the ever-evolving world of military innovation."
                    },
                    "index": {
                        "title": "Military Projects Hub",
                        "subheader": "Your central resource for military project information and news",
                        "cardTitle1": "Projects",
                        "cardContent1": "View and explore military projects from around the world.",
                        "cardButton1": "View Projects",
                        "cardTitle2": "News",
                        "cardContent2": "Stay updated with the latest military news and developments.",
                        "cardButton2": "Read News"
                    },
                    "nav": {
                        "home": "Home",
                        "projects": "Projects",
                        "news": "News",
                        "contact": "Contact",
                        "about": "About"
                    },
                    "projects": {
                        "title": "Military Projects",
                        "tableTitle": "Projects Table",
                        "searchPlaceholder": "Search projects...",
                        "image": "Image",
                        "projectName": "Project Name",
                        "startDate": "Project Start Date",
                        "serviceDate": "Commissioned",
                        "status": "Status",
                        "totalInService": "Total In Service",
                        "company": "Company",
                        "export": "Export",
                        "companyLink": "Official Site",
                        "officialSite": "Official Site",
                        "projectDetails": "Project Details",
                        "unknown": "Unknown",
                        "yes": "Yes",
                        "no": "No",
                        "na": "N/A",
                        "type": "Project Type",
                        "scale": "Project Scale",
                        "notes": "Notes",
                        "targetDate": "Target Date for Service",
                        "isExported": "Is Exported",
                        "exportCountries": "Export Countries",
                        "lastUpdated": "Last Updated",
                        "companySite": "Company Site",
                        "visitSite": "Visit Official Site"
                    },
                    "contact": {
                        "email": "Contact Us"
                    }
                }
            },
            tr: {
                translation: {
                    "about": {
                        "title": "Hakkımızda",
                        "cardTitle": "Askeri Projeler Merkezi",
                        "paragraph1": "Askeri Projeler Merkezi, dünyanın dört bir yanından en son savunma haberleri ve en gelişmiş askeri projeler hakkında bilgi edinebileceğiniz merkezi kaynağınızdır.",
                        "paragraph2": "Misyonumuz, küresel savunma gelişmeleri hakkında sizi bilgilendirmek için askeri teknoloji, araştırma ve geliştirme konularında doğru ve güncel bilgiler sunmaktır.",
                        "paragraph3": "İster savunma profesyoneli, ister araştırmacı, ister meraklı olun, Askeri Projeler Merkezi, sürekli gelişen askeri inovasyon dünyası hakkında değerli bilgiler sunar."
                    },
                    "index": {
                        "title": "Military Projects Hub",
                        "subheader": "Askeri proje bilgileri ve haberleri için merkezi kaynağınız",
                        "cardTitle1": "Projeler",
                        "cardContent1": "Dünyanın dört bir yanındaki askeri projeleri görüntüleyin ve keşfedin.",
                        "cardButton1": "Projeleri Görüntüle",
                        "cardTitle2": "Haberler",
                        "cardContent2": "En son askeri haberler ve gelişmelerle güncel kalın.",
                        "cardButton2": "Haberleri Oku"
                    },
                    "nav": {
                        "home": "Ana Sayfa",
                        "projects": "Projeler",
                        "news": "Haberler",
                        "about": "Hakkımızda",
                        "contact": "İletişim"
                    },
                    "projects": {
                        "title": "Askeri Projeler",
                        "tableTitle": "Projeler Tablosu",
                        "searchPlaceholder": "Projelerde ara...",
                        "image": "Görsel",
                        "projectName": "Proje Adı",
                        "startDate": "Proje Başlangıç Tarihi",
                        "serviceDate": "Hizmete Giriş Tarihi",
                        "status": "Durum",
                        "totalInService": "Envanter Sayısı",
                        "company": "Şirket",
                        "export": "İhracat",
                        "companyLink": "Resmi Site",
                        "officialSite": "Resmi Site",
                        "projectDetails": "Proje Detayları",
                        "unknown": "Bilinmiyor",
                        "yes": "Evet",
                        "no": "Hayır",
                        "na": "Uygulanamaz",
                        "type": "Proje Türü",
                        "scale": "Proje Ölçeği",
                        "notes": "Notlar",
                        "targetDate": "Hedef Hizmete Giriş Tarihi",
                        "isExported": "İhraç Edildi mi",
                        "exportCountries": "İhracat Edilen Ülkeleri",
                        "lastUpdated": "Son Güncelleme",
                        "companySite": "Şirket Sitesi",
                        "visitSite": "Resmi Siteyi Ziyaret Et"
                    },
                    "contact": {
                        "email": "Bize Ulaşın"
                    }
                }
            }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;