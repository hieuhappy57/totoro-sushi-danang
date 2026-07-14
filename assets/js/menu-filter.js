/**
 * Totoro Sushi & Grill - Menu Items Data and Filtering System (menu-filter.js)
 * Manages the menu database, dynamic rendering, and filtering logic.
 */

// 1. Menu Database (Realistic items with prices & tags)
const DEFAULT_MENU_ITEMS = [
    // --- THỊT NƯỚNG (nuong) ---
    {
        id: "nuong-de-vuong",
        name: "Bò Nướng Đế Vương",
        category: "nuong",
        price: 124000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt bò nướng bản to hảo hạng với vân mỡ cẩm thạch hoàn hảo, ướp sốt đế vương đặc biệt ngọt mọng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "nuong-bo-kobe",
        name: "Chảo Bò Kobe Sốt BBQ",
        category: "nuong",
        price: 147000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
        desc: "Bò Kobe thái mỏng xào chín tới cùng sốt BBQ đậm đà, phục vụ trên chảo gang xèo xèo giữ nhiệt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "nuong-nam-chay-toi",
        name: "Nầm Heo Cháy Tỏi",
        category: "nuong",
        price: 126000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Nầm heo nướng cháy tỏi vàng ruộm thơm nức, dai giòn sần sật ăn kèm rau thơm cực kỳ đưa miệng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: true,
        isNew: false
    },
    {
        id: "nuong-de-suon-bo",
        name: "Dẻ Sườn Bò Mỹ",
        category: "nuong",
        price: 126000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
        desc: "Dẻ sườn bò Mỹ nướng chín thơm ngậy, giữ được vị ngọt thịt tự nhiên đặc trưng đậm vị bò.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-loi-vai-my",
        name: "Lõi Vai Bò Mỹ",
        category: "nuong",
        price: 128000,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt lõi vai bò Mỹ thái lát vừa vặn, nướng chín tới chín tái ngọt thơm, mềm như bơ.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-ba-chi-bo-my",
        name: "Ba Chỉ Bò Mỹ Nướng Sốt",
        category: "nuong",
        price: 106000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Dải ba chỉ bò Mỹ với sọc mỡ đều đặn, nướng bếp âm bàn béo ngậy tẩm sốt BBQ ngọt đậm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-ba-chi-cuon-nam",
        name: "Ba Chỉ Bò Cuộn Nấm Kim Châm",
        category: "nuong",
        price: 92000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Ba chỉ bò cuốn nấm kim châm nướng sốt ngọt mằn mặn, nấm giòn ngọt, bò béo ngậy hòa quyện.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-ba-chi-cai-xanh",
        name: "Ba Chỉ Bò Cuộn Cải Xanh",
        category: "nuong",
        price: 92000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Ba chỉ bò Mỹ thái mỏng cuộn lá cải xanh giòn nhè nhẹ đắng ngọt, cân bằng chất béo hoàn hảo.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-ma-heo-sa-te",
        name: "Má Heo Lắc Lư Sốt Cay",
        category: "nuong",
        price: 94000,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop",
        desc: "Má heo giòn mềm ướp sốt sa tế cay nồng lắc lư trên vỉ nướng xèo xèo thơm ngậy.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: true
    },
    {
        id: "nuong-nong-heo",
        name: "Nọng Heo Mềm Béo",
        category: "nuong",
        price: 96000,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop",
        desc: "Nọng heo nướng bếp than vàng giòn rùm rụm, ngọt mọng mỡ xen thịt ăn kèm dưa muối.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-nac-vai-heo",
        name: "Nạc Vai Đầu Giòn",
        category: "nuong",
        price: 87000,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop",
        desc: "Lõi thịt nạc vai heo nướng thái lát vừa vặn, nướng chín tới mềm ngọt, giòn xực.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-ba-chi-leo-doi",
        name: "Ba Chỉ Heo Leo Đồi",
        category: "nuong",
        price: 82000,
        image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt ba chỉ heo giòn thơm nướng cháy xém cạnh rưới sốt BBQ ngậy ngọt đưa vị.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-nam-heo-sua",
        name: "Nầm Heo Sữa",
        category: "nuong",
        price: 95000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Nầm heo sữa nướng bếp âm bàn thơm lừng, vị sữa béo nhẹ nướng chấm tương ớt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-dui-ga-sate",
        name: "Đùi Gà Nướng Soa Tế",
        category: "nuong",
        price: 85000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Đùi gà rút xương ướp nước sốt sa tế độc quyền nướng vàng ươm thơm phức.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nuong-long-heo",
        name: "Lòng Heo Nướng Cay",
        category: "nuong",
        price: 88000,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=600&auto=format&fit=crop",
        desc: "Lòng heo làm sạch sành sanh giòn dai nướng cay tê tê ăn kèm kim chi.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },

    // --- HẢI SẢN NƯỚNG (haisan) ---
    {
        id: "haisan-tom-muoi-ot",
        name: "Tôm Nướng Sốt Muối Ớt",
        category: "haisan",
        price: 96000,
        image: "https://images.unsplash.com/photo-1559715745-e1b34a270d88?q=80&w=600&auto=format&fit=crop",
        desc: "Tôm nướng phủ sốt muối ớt cay đậm đà, thịt tôm ngọt dai, thơm giòn ngậy.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "haisan-bach-tuoc-sate",
        name: "Bạch Tuộc Nướng Cay Sa Tế",
        category: "haisan",
        price: 96000,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
        desc: "Bạch tuộc bản to ướp sốt sa tế cay nồng nướng trên bếp than hồng xèo xèo giòn ngọt.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "haisan-hau-phomai",
        name: "Hàu Nướng Phô Mai (2 Con)",
        category: "haisan",
        price: 39000,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
        desc: "Hàu sữa to mọng ngập sốt phô mai béo ngậy kéo sợi nướng khè lửa tan chảy.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "haisan-hau-mo-hanh",
        name: "Hàu Nướng Mỡ Hành (2 Con)",
        category: "haisan",
        price: 39000,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
        desc: "Hàu nướng mỡ hành phi thơm phức, rắc lạc rang giòn sần sật bùi béo ngọt hàu.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },

    // --- SET COMBO (combo) ---
    {
        id: "combo-am-ap",
        name: "Combo Siêu Ấm Áp Lẩu Nướng",
        category: "combo",
        price: 542000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Set combo đầy đặn gồm: Nầm heo, Ba chỉ heo, Lõi vai, Cơm trộn thố đá, Soup Kimchi, Salad thanh cua, Cơm trắng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "combo-sum-vay",
        name: "Combo Sum Vầy Lẩu Nướng",
        category: "combo",
        price: 587000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Set tiệc sum vầy gồm: Salad thanh cua, Bắp chiên phô mai, Lõi vai bò, Ba chỉ heo, Ba chỉ bò cuộn nấm và Nồi Lẩu thơm ấm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "combo-sieu-uu-dai",
        name: "Combo Siêu Ưu Đãi Lẩu Nướng",
        category: "combo",
        price: 598000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Đặc sản nướng: Bò kobe nướng, Nầm heo, Ba chỉ heo, Bạch tuộc sốt tê cay, Soup Kimchi, Salad thanh cua, Chả giò Hàn Quốc.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: true,
        isNew: false
    },
    {
        id: "combo-duong-pho",
        name: "Combo Lẩu Nướng Đường Phố",
        category: "combo",
        price: 653000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Thực đơn vỉa hè: Lõi vai bò, Nầm heo, Ba chỉ bò, Nạc nọng heo, Khoai tây chiên, Salad thanh cua, Nồi lẩu nóng hổi.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "combo-totoro",
        name: "Combo ToToRoooooo Cực Đại",
        category: "combo",
        price: 783000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Khay tiệc lớn: Bò kobe, Tôm, Ba chỉ heo, Nọng heo, Nầm heo cháy tỏi, Xiên gà nướng, Salad thanh cua, Lẩu nhỏ.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "combo-ichi",
        name: "Combo Ichi Nướng Tiện Lợi",
        category: "combo",
        price: 498000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Set ăn nhanh: Ba Chỉ Bò Nướng BBQ, Súp Kim Chi, Cơm trộn, Nấm chiên, Salad thanh cua, 2 ly Nước Gạo Rang Woongjin.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "set-nuong-a",
        name: "Set Nướng Phổ Thông A",
        category: "combo",
        price: 287000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Set nướng thịt heo, nấm kim châm cuộn thịt và hàu phô mai.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "set-nuong-b",
        name: "Set Nướng Phổ Thông B",
        category: "combo",
        price: 387000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Set nướng hỗn hợp bò Mỹ nướng, ba chỉ heo nướng cùng tôm muối ớt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "set-nuong-c",
        name: "Set Nướng Phổ Thông C",
        category: "combo",
        price: 387000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Lưới nướng hảo hạng gồm dẻ sườn bò, ba chỉ và nầm heo sữa ngon lành.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },

    // --- KHAI VỊ & SALAD (khai-vi / salad) ---
    {
        id: "app-salad-trung-ngam",
        name: "Salad Trứng Ngâm Tương",
        category: "khai-vi",
        price: 68000,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        desc: "Xà lách tươi trộn nước sốt dầu giấm Nhật thanh mát ăn kèm trứng lòng đào ngâm nước tương tỏi ớt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-salad-thanh-cua",
        name: "Salad Thanh Cua Mayonnaise",
        category: "khai-vi",
        price: 64000,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        desc: "Sợi thanh cua mềm ngọt trộn rau củ quả thái sợi, rưới sốt mayonnaise Nhật béo thơm lạnh mát.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-trung-ngam-sot",
        name: "Trứng Ngâm Tương Sốt Hàn Quốc",
        category: "khai-vi",
        price: 47000,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
        desc: "Trứng lòng đào ngâm tương tỏi ớt, hạt vừng mặn ngọt ngậy béo ăn rất ngốn cơm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-rong-bien",
        name: "Salad Rong Biển Trộn Mè",
        category: "khai-vi",
        price: 43000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
        desc: "Rong biển tươi cắt sợi, trộn dầu mè ngọt nhẹ mát mẻ thanh lọc cơ thể.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-rong-nho",
        name: "Salad Rong Nho Sốt Mè Rang",
        category: "khai-vi",
        price: 43000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
        desc: "Rong nho biển tươi giòn tanh tách từng hạt nổ nhẹ, chấm cùng sốt mè rang.",
        spicy: false,
        cooked: false,
        raw: true,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-khoai-phomai",
        name: "Khoai Tây Lắc Phô Mai",
        category: "khai-vi",
        price: 55000,
        image: "https://images.unsplash.com/photo-1518013006335-ee11001a9b3f?q=80&w=600&auto=format&fit=crop",
        desc: "Khoai tây cắt thanh dày chiên vàng giòn rụm xóc bột phô mai mặn ngọt cho các bé thích mê.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-mandu",
        name: "Bánh Mandu Chiên Kiểu Hàn",
        category: "khai-vi",
        price: 68000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "5 cái bánh mandu nhân thịt băm chiên phồng vỏ giòn chấm xì dầu hành.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-okonomi",
        name: "Bánh Xèo Nhật Bản",
        category: "khai-vi",
        price: 82000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Bánh xèo truyền thống nhân bắp cải bạch tuộc mực xé phủ bột rong biển vụn cá bào.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-banh-mi-cheese",
        name: "Bánh Mì Sốt Phô Mai",
        category: "khai-vi",
        price: 38000,
        image: "https://images.unsplash.com/photo-1518013006335-ee11001a9b3f?q=80&w=600&auto=format&fit=crop",
        desc: "Bánh mì gối nướng giòn rưới đầy sốt phô mai đặc chế thơm ngậy béo mềm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-bap-phomai",
        name: "Bắp Chiên Phô Mai",
        category: "khai-vi",
        price: 66000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
        desc: "Hạt bắp ngọt tẩm bột chiên vàng đều xóc bột phô mai giòn thơm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "app-ga-mat-ong",
        name: "Gà Chiên Sốt Mật Ong",
        category: "khai-vi",
        price: 66000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Đùi tỏi gà viên tẩm bột chiên rụm đảo sốt mật ong ngọt dính tay.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },

    // --- MÓN CHỜ - MÓN ĐỢI (salad) ---
    {
        id: "side-tokbokki",
        name: "Tokbokki Sốt Phô Mai Cay",
        category: "salad",
        price: 93000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Bánh gạo tokbokki hầm nước sốt cay ớt Hàn Quốc kéo sợi phô mai béo ngậy thơm nồng.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-takoyaki",
        name: "Bánh Bạch Tuộc Takoyaki (6 Viên)",
        category: "salad",
        price: 65000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Bánh bột nướng tròn xoe nhân râu bạch tuộc, rưới sốt okonomi xốt mayo cá bào.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-bt-te-cay",
        name: "Bạch Tuộc Sò Tê Cay",
        category: "salad",
        price: 114000,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
        desc: "Thịt bạch tuộc xào sốt cay tê lưỡi, nướng chín tới đậm vị sa tế.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-nam-chien",
        name: "Nấm Kim Châm Chiên Giòn",
        category: "salad",
        price: 56000,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
        desc: "Nấm kim châm tẩm bột chiên giòn xòe râu nấm xù chấm sốt chua ngọt đưa miệng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-tom-chien",
        name: "Tôm Chiên Giòn Bột Xù",
        category: "salad",
        price: 108000,
        image: "https://images.unsplash.com/photo-1559715745-e1b34a270d88?q=80&w=600&auto=format&fit=crop",
        desc: "Tôm lột vỏ tẩm bột xù xù chiên giòn tan chấm tương ớt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-cha-gio",
        name: "Chả Giò Rong Biển Hàn Quốc",
        category: "salad",
        price: 62000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Chả giò cuộn miến dong vỏ rong biển chiên giòn ngập dầu ăn giòn xốp thơm ngậy.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-sun-ga",
        name: "Sụn Gà Chiên Nước Mắm Tỏi",
        category: "salad",
        price: 95000,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
        desc: "Sụn gà ta sần sật xào nước mắm tỏi thơm phức, ngọt mặn cực kỳ cuốn vị.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "side-so-diep",
        name: "Sò Điệp Chiên Xù",
        category: "salad",
        price: 81000,
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop",
        desc: "Cồi sò điệp tươi tẩm bột xù chiên vàng rụm dai ngon ngọt thịt.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },

    // --- CƠM & MỲ (nong) ---
    {
        id: "nong-com-chien-hs",
        name: "Cơm Chiên Hải Sản Hạt Tơi",
        category: "nong",
        price: 115000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm chiên đảo vàng hạt tơi xốp xào tôm sú tươi ngon và mực giòn, dưa chuột.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-com-bt-gion",
        name: "Cơm Chiên Bạch Tuộc Giòn",
        category: "nong",
        price: 98000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm chiên bạch tuộc hạt tơi sần sật hành tỏi thơm phức cay cay tê tê đầu lưỡi.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-canh-kimchi",
        name: "Canh Kim Chi Đậu Hũ Non",
        category: "nong",
        price: 89000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Nồi canh kimchi nóng hôi hổi chua cay ninh thịt ba chỉ heo đậu hũ non dẻo mềm.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-com-bo-my",
        name: "Cơm Bò Mỹ Thượng Hạng",
        category: "nong",
        price: 92000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm trắng phủ thịt bò Mỹ xào hành tây sốt hàu đậm vị ngọt dẻo dưa chuột.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-com-tron-bo",
        name: "Cơm Trộn Bò Nướng Thố Đá",
        category: "nong",
        price: 73000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm trộn Hàn Quốc thố đá gồm rau củ, bò nướng, trứng ốp lòng đào rưới sốt cay đỏ.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-udon-xao",
        name: "Mỳ Udon Xào Bò Mỹ Sốt Dầu Hào",
        category: "nong",
        price: 87000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Sợi mì udon to dẻo mềm xào chín tới cùng thịt bò Mỹ thái mỏng hành tây cà rốt xốt hàu thơm nức.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-udon-kimchi",
        name: "Mỳ Udon Súp Kim Chi Bò Mỹ",
        category: "nong",
        price: 94000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Sợi mì udon to dai trong súp kimchi cay nồng ấm nóng nhúng ngập bò Mỹ thái mỏng.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-com-luon",
        name: "Cơm Lươn Nhật Kabayaki 1/2 Con",
        category: "nong",
        price: 197000,
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=600&auto=format&fit=crop",
        desc: "Lươn nướng sốt ngọt Kabayaki truyền thống dải trên thố cơm trắng dẻo hạt thơm.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-my-lanh",
        name: "Mỳ Lạnh Hàn Quốc Súp Đá",
        category: "nong",
        price: 87000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Mì lạnh thanh mát súp đá trong veo giải nhiệt mùa hè nhúng bò luộc trứng luộc dưa lê.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "nong-com-thai",
        name: "Cơm Chiên Bò Kiểu Thái Cay",
        category: "nong",
        price: 105000,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop",
        desc: "Cơm rang bò sốt Thái chua cay rắc lá húng quế thơm nồng đưa vị.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },

    // --- LẨU (lau) ---
    {
        id: "lau-uyen-uong",
        name: "Lẩu Uyên Ương Hai Ngăn",
        category: "lau",
        price: 174000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Nồi lẩu hai ngăn tiện lợi: Một bên Thái Tomyum chua cay xè, một bên súp nấm Kombu thanh mát ngọt bùi nhúng ngập thịt rau.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: true,
        isNew: false
    },
    {
        id: "lau-thai-haisan",
        name: "Lẩu Thái Hải Sản Lớn",
        category: "lau",
        price: 284000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Nồi lẩu lớn nhúng tôm mực nghêu cá tươi sống ngập tràn, súp thái tom yum cay tê kích thích vị giác.",
        spicy: true,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: true,
        isNew: false
    },

    // --- ĐỒ UỐNG (drink) ---
    {
        id: "drink-sake",
        name: "Rượu Sake Nhật Bản (300ML)",
        category: "drink",
        price: 238000,
        image: "https://images.unsplash.com/photo-1608885898957-a599fb1698d6?q=80&w=600&auto=format&fit=crop",
        desc: "Bình rượu sake Ozeki 300ml truyền thống ấm nóng thích hợp đưa vị ăn đồ nướng Yakiniku.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-ruou-mo",
        name: "Rượu Mơ Choya Nhật (300ML)",
        category: "drink",
        price: 238000,
        image: "https://images.unsplash.com/photo-1608885898957-a599fb1698d6?q=80&w=600&auto=format&fit=crop",
        desc: "Rượu mơ ngọt thanh thơm dịu nồng nồng nhẹ ấm vị quả mơ tươi Nhật Bản.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-soju",
        name: "Rượu Soju Hàn Quốc",
        category: "drink",
        price: 154000,
        image: "https://images.unsplash.com/photo-1608885898957-a599fb1698d6?q=80&w=600&auto=format&fit=crop",
        desc: "Rượu Soju chai thủy tinh xanh truyền thống Hàn Quốc.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: false,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-coca",
        name: "Lon Coca-Cola Mát Lạnh",
        category: "drink",
        price: 22000,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop",
        desc: "Nước ngọt lon mát lạnh giúp giải toả độ béo ngậy thịt nướng.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-nuoc-gao",
        name: "Nước Gạo Rang Woongjin Korea",
        category: "drink",
        price: 34000,
        image: "https://images.unsplash.com/photo-1547928576-a4a3323dce9d?q=80&w=600&auto=format&fit=crop",
        desc: "Nước gạo rang sữa bùi bùi thơm béo ngậy lạnh mát ngọt ngào chuẩn Hàn.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-soda-vietquat",
        name: "Soda Việt Quất Bạc Hà",
        category: "drink",
        price: 42000,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
        desc: "Ly soda sủi bọt siro việt quất chua ngọt cùng lá bạc hà sảng khoái mát lạnh.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    },
    {
        id: "drink-nuoc-ep-thom",
        name: "Nước Ép Quả Thơm Tươi",
        category: "drink",
        price: 42000,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
        desc: "Nước ép quả dứa thơm ép tươi mát lạnh giải nhiệt sảng khoái.",
        spicy: false,
        cooked: true,
        raw: false,
        childFriendly: true,
        bestSeller: false,
        isNew: false
    }
];

// Initialize dynamic MENU_ITEMS array
let MENU_ITEMS = [];

// Helper to load local menu fallback
function loadLocalMenuFallback() {
    try {
        const storedMenu = localStorage.getItem('totoro_menu');
        if (storedMenu) {
            MENU_ITEMS = JSON.parse(storedMenu);
        } else {
            MENU_ITEMS = [...DEFAULT_MENU_ITEMS];
            localStorage.setItem('totoro_menu', JSON.stringify(MENU_ITEMS));
        }
    } catch (e) {
        MENU_ITEMS = [...DEFAULT_MENU_ITEMS];
    }
}

// 2. DOM Rendering & Filtering Logic
let selectedProductForModal = null;

document.addEventListener('DOMContentLoaded', function() {
    // Fetch menu from Vercel Serverless Backend (Cache-busted)
    fetch('/api/menu?t=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            if (data && !data.error) {
                if (data.fallback && data.menu) {
                    loadLocalMenuFallback();
                } else if (Array.isArray(data)) {
                    MENU_ITEMS = data;
                } else {
                    loadLocalMenuFallback();
                }
            } else {
                loadLocalMenuFallback();
            }
        })
        .catch(err => {
            console.warn("Backend API not reachable, loading fallback:", err);
            loadLocalMenuFallback();
        })
        .finally(() => {
            renderMenuGrids();
            setupFilters();
            setupModalEvents();
        });
});

// Render function for index.html (Best Sellers) & menu.html (Full filtered list)
function renderMenuGrids(itemsToRender = MENU_ITEMS) {
    // A. For Homepage (Best Sellers only - max 6 items)
    const bestSellerGrid = document.getElementById('bestseller-grid');
    if (bestSellerGrid) {
        const bestSellers = MENU_ITEMS.filter(item => item.bestSeller).slice(0, 6);
        bestSellerGrid.innerHTML = bestSellers.map(item => generateProductCardHtml(item)).join('');
        setupCardClicks(bestSellerGrid);
    }

    // B. For Menu Page (All items with full filter options)
    const mainMenuGrid = document.getElementById('main-menu-grid');
    if (mainMenuGrid) {
        if (itemsToRender.length === 0) {
            mainMenuGrid.innerHTML = `
                <div class="empty-cart-view" style="grid-column: 1 / -1;">
                    <div class="empty-cart-icon">🍱</div>
                    <h3>Không tìm thấy món ăn nào phù hợp!</h3>
                    <p style="color: var(--color-text-muted);">Quý khách vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
                </div>
            `;
            return;
        }
        mainMenuGrid.innerHTML = itemsToRender.map(item => generateProductCardHtml(item)).join('');
        setupCardClicks(mainMenuGrid);
    }
}

// Generate product card HTML snippet
function generateProductCardHtml(item) {
    const badgeHtml = item.bestSeller 
        ? `<span class="product-card-badge">Bán Chạy</span>` 
        : (item.isNew ? `<span class="product-card-badge new">Món Mới</span>` : '');

    const tagsHtml = [];
    if (item.spicy) tagsHtml.push('🌶️');
    if (item.raw) tagsHtml.push('🍣 Món Sống');
    if (item.childFriendly) tagsHtml.push('👶 Cho Bé');
    const tagsString = tagsHtml.length > 0 
        ? `<div style="font-size: 11px; margin-top: 4px; color: var(--color-primary); font-weight: 700;">${tagsHtml.join(' | ')}</div>` 
        : '';

    return `
        <div class="product-card" data-id="${item.id}">
            ${badgeHtml}
            <div class="product-card-img-wrapper" style="cursor: pointer;">
                <img src="${item.image}" alt="${item.name}" class="product-card-img" loading="lazy" />
            </div>
            <div class="product-card-body">
                <h3 class="product-card-title" style="cursor: pointer;">${item.name}</h3>
                ${tagsString}
                <p class="product-card-desc" style="margin-top: 6px;">${item.desc}</p>
                <div class="product-card-footer">
                    <span class="product-card-price">${item.price.toLocaleString('vi-VN')}đ</span>
                    <button class="product-card-btn add-to-cart-quick" data-id="${item.id}" aria-label="Thêm vào giỏ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Setup card click event triggers to open details modal
function setupCardClicks(container) {
    // 1. Click on image or title -> opens details modal
    container.querySelectorAll('.product-card-img-wrapper, .product-card-title').forEach(el => {
        el.addEventListener('click', function(e) {
            const card = this.closest('.product-card');
            const id = card.getAttribute('data-id');
            openProductModal(id);
        });
    });

    // 2. Click on quick add to cart button -> adds to cart directly
    container.querySelectorAll('.add-to-cart-quick').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.getAttribute('data-id');
            const item = MENU_ITEMS.find(i => i.id === id);
            if (item && typeof addToCart === 'function') {
                addToCart(item, 1);
            }
        });
    });
}

// Setup the filter, search and sort controls in menu.html
function setupFilters() {
    const searchInput = document.getElementById('menu-search-input');
    const categoryButtons = document.querySelectorAll('.filter-tag-btn[data-category]');
    const propFilters = document.querySelectorAll('.filter-tag-btn[data-prop]');
    const sortSelect = document.getElementById('menu-sort-select');
    const priceRangeInput = document.getElementById('menu-price-range');
    const priceDisplay = document.getElementById('menu-price-display');

    if (!searchInput && categoryButtons.length === 0) return; // Not on Menu page

    let currentFilters = {
        category: 'all',
        search: '',
        maxPrice: 600000,
        props: [] // spicy, raw, cooked, childFriendly
    };

    const applyAllFilters = function() {
        let filtered = [...MENU_ITEMS];

        // 1. Filter Category
        if (currentFilters.category !== 'all') {
            filtered = filtered.filter(item => item.category === currentFilters.category);
        }

        // 2. Filter Search Term
        if (currentFilters.search) {
            const keyword = currentFilters.search.toLowerCase().trim();
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(keyword) || 
                item.desc.toLowerCase().includes(keyword)
            );
        }

        // 3. Filter Price
        if (priceRangeInput) {
            currentFilters.maxPrice = parseInt(priceRangeInput.value);
            filtered = filtered.filter(item => item.price <= currentFilters.maxPrice);
            if (priceDisplay) {
                priceDisplay.textContent = currentFilters.maxPrice.toLocaleString('vi-VN') + 'đ';
            }
        }

        // 4. Filter Attributes
        currentFilters.props.forEach(prop => {
            filtered = filtered.filter(item => item[prop]);
        });

        // 5. Apply Sorting
        if (sortSelect) {
            const sortBy = sortSelect.value;
            if (sortBy === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortBy === 'newest') {
                filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            } else if (sortBy === 'bestseller') {
                filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
            }
        }

        renderMenuGrids(filtered);
    };

    // Listeners for Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value;
            applyAllFilters();
        });
    }

    // Listeners for Category buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.category = this.getAttribute('data-category');
            applyAllFilters();
        });
    });

    // Listeners for Property attribute buttons (multiselect)
    propFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            const prop = this.getAttribute('data-prop');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                currentFilters.props.push(prop);
            } else {
                currentFilters.props = currentFilters.props.filter(p => p !== prop);
            }
            applyAllFilters();
        });
    });

    // Listeners for Sorting select
    if (sortSelect) {
        sortSelect.addEventListener('change', applyAllFilters);
    }

    // Listeners for Price range slider
    if (priceRangeInput) {
        priceRangeInput.addEventListener('input', applyAllFilters);
    }
}

// 3. Details Modal Logic
function openProductModal(productId) {
    const item = MENU_ITEMS.find(i => i.id === productId);
    if (!item) return;

    selectedProductForModal = item;

    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    // Fill details
    modal.querySelector('.modal-img').src = item.image;
    modal.querySelector('.modal-img').alt = item.name;
    modal.querySelector('.modal-title').textContent = item.name;
    modal.querySelector('.modal-price').textContent = item.price.toLocaleString('vi-VN') + 'đ';
    modal.querySelector('.modal-desc').textContent = item.desc;
    
    // Reset quantity to 1
    modal.querySelector('.quantity-input').value = 1;

    // Open modal
    modal.classList.add('open');
}

function setupModalEvents() {
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    // Close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            selectedProductForModal = null;
        });
    }

    // Click outside close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            selectedProductForModal = null;
        }
    });

    // Plus & Minus buttons inside modal
    const plusBtn = modal.querySelector('.qty-plus');
    const minusBtn = modal.querySelector('.qty-minus');
    const qtyInput = modal.querySelector('.quantity-input');

    if (plusBtn && minusBtn && qtyInput) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });

        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
    }

    // Add to cart button inside modal
    const addToCartBtn = modal.getElementById('modal-add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (selectedProductForModal && typeof addToCart === 'function') {
                const qty = parseInt(qtyInput.value) || 1;
                addToCart(selectedProductForModal, qty);
                modal.classList.remove('open');
                selectedProductForModal = null;
            }
        });
    }
}
