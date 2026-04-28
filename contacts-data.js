// BOC IT Department Contacts Data
const contactsData = [
    {
        id: 1,
        name: "張志明",
        department: "資訊科技部",
        position: "資訊科技總監",
        phone: "3982 8888",
        mobile: "9123 4567",
        email: "cheung.chiming@bocgroup.com",
        notes: "負責整體IT策略規劃"
    },
    {
        id: 2,
        name: "李美華",
        department: "資訊科技部",
        position: "副總監",
        phone: "3982 8889",
        mobile: "9123 4568",
        email: "lee.meihwa@bocgroup.com",
        notes: "主管系統開發"
    },
    {
        id: 3,
        name: "王偉強",
        department: "資訊科技部",
        position: "系統架構師",
        phone: "3982 8890",
        mobile: "9123 4569",
        email: "wong.waikeung@bocgroup.com",
        notes: "核心系統架構設計"
    },
    {
        id: 4,
        name: "陳大文",
        department: "網絡安全部",
        position: "安全主管",
        phone: "3982 8891",
        mobile: "9123 4570",
        email: "chan.taiman@bocgroup.com",
        notes: "負責資訊安全政策"
    },
    {
        id: 5,
        name: "劉小麗",
        department: "網絡安全部",
        position: "安全分析師",
        phone: "3982 8892",
        mobile: "9123 4571",
        email: "lau.siulai@bocgroup.com",
        notes: "威脅情報分析"
    },
    {
        id: 6,
        name: "黃國榮",
        department: "網絡安全部",
        position: "滲透測試專家",
        phone: "3982 8893",
        mobile: "9123 4572",
        email: "wong.kokwing@bocgroup.com",
        notes: "定期安全評估"
    },
    {
        id: 7,
        name: "馬志偉",
        department: "基礎設施部",
        position: "基礎設施經理",
        phone: "3982 8894",
        mobile: "9123 4573",
        email: "ma.chiwai@bocgroup.com",
        notes: "數據中心運營"
    },
    {
        id: 8,
        name: "林秀芳",
        department: "基礎設施部",
        position: "系統管理員",
        phone: "3982 8895",
        mobile: "9123 4574",
        email: "lam.saufong@bocgroup.com",
        notes: "伺服器維護"
    },
    {
        id: 9,
        name: "趙家豪",
        department: "基礎設施部",
        position: "網絡工程師",
        phone: "3982 8896",
        mobile: "9123 4575",
        email: "chiu.kaho@bocgroup.com",
        notes: "網絡設備管理"
    },
    {
        id: 10,
        name: "吳詩敏",
        department: "應用開發部",
        position: "開發主管",
        phone: "3982 8897",
        mobile: "9123 4576",
        email: "ng.siman@bocgroup.com",
        notes: "移動應用開發團隊"
    },
    {
        id: 11,
        name: "周志文",
        department: "應用開發部",
        position: "高級開發工程師",
        phone: "3982 8898",
        mobile: "9123 4577",
        email: "chow.chiman@bocgroup.com",
        notes: "網上銀行系統"
    },
    {
        id: 12,
        name: "鄭雅婷",
        department: "應用開發部",
        position: "前端開發工程師",
        phone: "3982 8899",
        mobile: "9123 4578",
        email: "cheng.ngating@bocgroup.com",
        notes: "UI/UX 設計"
    },
    {
        id: 13,
        name: "何俊傑",
        department: "數據分析部",
        position: "數據科學家",
        phone: "3982 8900",
        mobile: "9123 4579",
        email: "ho.chunkit@bocgroup.com",
        notes: "大數據分析平台"
    },
    {
        id: 14,
        name: "謝婉儀",
        department: "數據分析部",
        position: "數據工程師",
        phone: "3982 8901",
        mobile: "9123 4580",
        email: "tse.wunyee@bocgroup.com",
        notes: "數據倉庫管理"
    },
    {
        id: 15,
        name: "羅家明",
        department: "數據分析部",
        position: "BI 分析師",
        phone: "3982 8902",
        mobile: "9123 4581",
        email: "lo.kaming@bocgroup.com",
        notes: "商業智能報表"
    },
    {
        id: 16,
        name: "蘇美玲",
        department: "項目管理部",
        position: "項目總監",
        phone: "3982 8903",
        mobile: "9123 4582",
        email: "so.meiling@bocgroup.com",
        notes: "IT 項目管理辦公室"
    },
    {
        id: 17,
        name: "梁志剛",
        department: "項目管理部",
        position: "項目經理",
        phone: "3982 8904",
        mobile: "9123 4583",
        email: "leung.chikong@bocgroup.com",
        notes: "核心系統升級項目"
    },
    {
        id: 18,
        name: "鍾曉彤",
        department: "項目管理部",
        position: "項目協調員",
        phone: "3982 8905",
        mobile: "9123 4584",
        email: "chung.hiutung@bocgroup.com",
        notes: "項目進度追蹤"
    },
    {
        id: 19,
        name: "許志豪",
        department: "技術支援部",
        position: "支援主管",
        phone: "3982 8906",
        mobile: "9123 4585",
        email: "hui.chiho@bocgroup.com",
        notes: "24/7 技術支援"
    },
    {
        id: 20,
        name: "馮詠琪",
        department: "技術支援部",
        position: "技術支援專員",
        phone: "3982 8907",
        mobile: "9123 4586",
        email: "fung.wingkei@bocgroup.com",
        notes: "用戶問題處理"
    },
    {
        id: 21,
        name: "潘家榮",
        department: "技術支援部",
        position: "桌面支援工程師",
        phone: "3982 8908",
        mobile: "9123 4587",
        email: "poon.kawing@bocgroup.com",
        notes: "桌面設備維護"
    },
    {
        id: 22,
        name: "蔣美琪",
        department: "質量保證部",
        position: "QA 經理",
        phone: "3982 8909",
        mobile: "9123 4588",
        email: "chiang.meiqi@bocgroup.com",
        notes: "測試策略制定"
    },
    {
        id: 23,
        name: "蔡志偉",
        department: "質量保證部",
        position: "自動化測試工程師",
        phone: "3982 8910",
        mobile: "9123 4589",
        email: "tsoi.chiwai@bocgroup.com",
        notes: "自動化測試框架"
    },
    {
        id: 24,
        name: "盧曉明",
        department: "質量保證部",
        position: "性能測試工程師",
        phone: "3982 8911",
        mobile: "9123 4590",
        email: "lo.hiuming@bocgroup.com",
        notes: "系統性能優化"
    },
    {
        id: 25,
        name: "莫家輝",
        department: "雲計算部",
        position: "雲架構師",
        phone: "3982 8912",
        mobile: "9123 4591",
        email: "mok.kafai@bocgroup.com",
        notes: "AWS/Azure 雲平台"
    },
    {
        id: 26,
        name: "湯美玲",
        department: "雲計算部",
        position: "DevOps 工程師",
        phone: "3982 8913",
        mobile: "9123 4592",
        email: "tong.meiling@bocgroup.com",
        notes: "CI/CD 管道"
    },
    {
        id: 27,
        name: "溫志強",
        department: "雲計算部",
        position: "容器化專家",
        phone: "3982 8914",
        mobile: "9123 4593",
        email: "wan.chikeung@bocgroup.com",
        notes: "Kubernetes 管理"
    },
    {
        id: 28,
        name: "畢家俊",
        department: "人工智能部",
        position: "AI 研究主管",
        phone: "3982 8915",
        mobile: "9123 4594",
        email: "but.kachun@bocgroup.com",
        notes: "機器學習項目"
    },
    {
        id: 29,
        name: "岑雅詩",
        department: "人工智能部",
        position: "機器學習工程師",
        phone: "3982 8916",
        mobile: "9123 4595",
        email: "sum.ngasze@bocgroup.com",
        notes: "自然語言處理"
    },
    {
        id: 30,
        name: "施志遠",
        department: "人工智能部",
        position: "數據科學家",
        phone: "3982 8917",
        mobile: "9123 4596",
        email: "sze.chiyuen@bocgroup.com",
        notes: "預測分析模型"
    }
];

// Department list
const departments = [
    "資訊科技部",
    "網絡安全部",
    "基礎設施部",
    "應用開發部",
    "數據分析部",
    "項目管理部",
    "技術支援部",
    "質量保證部",
    "雲計算部",
    "人工智能部"
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { contactsData, departments };
}
