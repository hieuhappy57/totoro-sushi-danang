// Vercel Serverless Function: api/menu.js
// Manages the restaurant product catalog on Google Cloud Firestore via REST API

const DEFAULT_MENU_ITEMS = [
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

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_API_KEY;

    // Check if configuration is missing -> Fallback Mode
    const isFallbackMode = !projectId || !apiKey;

    if (req.method === 'GET') {
        try {
            if (isFallbackMode) {
                return res.status(200).json({ 
                    fallback: true,
                    menu: DEFAULT_MENU_ITEMS 
                });
            }

            const getUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/menu?key=${apiKey}`;
            const response = await fetch(getUrl);
            const data = await response.json();

            if (!response.ok) {
                // If it's a 404 (Collection doesn't exist yet), let's auto-seed!
                if (response.status === 404 || !data.documents) {
                    await seedDefaultMenu(projectId, apiKey);
                    return res.status(200).json(DEFAULT_MENU_ITEMS);
                }
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to fetch menu from Firestore." 
                });
            }

            // If empty collection
            if (!data.documents || data.documents.length === 0) {
                await seedDefaultMenu(projectId, apiKey);
                return res.status(200).json(DEFAULT_MENU_ITEMS);
            }

            // Map Firestore documents to flat JSON array
            const menuItems = data.documents.map(doc => {
                const fields = doc.fields || {};
                return {
                    id: fields.id?.stringValue || doc.name.split('/').pop(),
                    name: fields.name?.stringValue || "",
                    category: fields.category?.stringValue || "",
                    price: parseInt(fields.price?.integerValue || 0),
                    image: fields.image?.stringValue || "",
                    desc: fields.desc?.stringValue || "",
                    spicy: !!fields.spicy?.booleanValue,
                    cooked: !!fields.cooked?.booleanValue,
                    raw: !!fields.raw?.booleanValue,
                    childFriendly: !!fields.childFriendly?.booleanValue,
                    bestSeller: !!fields.bestSeller?.booleanValue,
                    isNew: !!fields.isNew?.booleanValue
                };
            });

            return res.status(200).json(menuItems);
        } catch (err) {
            return res.status(500).json({ error: err.message, fallback: DEFAULT_MENU_ITEMS });
        }
    }

    if (req.method === 'POST') {
        try {
            const item = req.body; // { id, name, category, price, image, desc, spicy, cooked, raw, childFriendly, bestSeller, isNew }

            if (!item.id || !item.name || !item.category) {
                return res.status(400).json({ error: "Missing required fields (id, name, category)." });
            }

            if (isFallbackMode) {
                return res.status(200).json({ success: true, id: item.id, fallback: true });
            }

            // Map flat JSON to Firestore format
            const firestorePayload = {
                fields: {
                    id: { stringValue: item.id },
                    name: { stringValue: item.name },
                    category: { stringValue: item.category },
                    price: { integerValue: parseInt(item.price) || 0 },
                    image: { stringValue: item.image || "" },
                    desc: { stringValue: item.desc || "" },
                    spicy: { booleanValue: !!item.spicy },
                    cooked: { booleanValue: !!item.cooked },
                    raw: { booleanValue: !!item.raw },
                    childFriendly: { booleanValue: !!item.childFriendly },
                    bestSeller: { booleanValue: !!item.bestSeller },
                    isNew: { booleanValue: !!item.isNew }
                }
            };

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/menu?documentId=${item.id}&key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firestorePayload)
            });

            // If it already exists, Firestore returns error ALREADY_EXISTS. In that case, we PATCH (update) it!
            if (response.status === 409) {
                const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/menu/${item.id}?key=${apiKey}`;
                const patchResponse = await fetch(patchUrl, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(firestorePayload)
                });
                
                const patchData = await patchResponse.json();
                if (patchResponse.ok) {
                    return res.status(200).json({ success: true, id: item.id, updated: true });
                } else {
                    return res.status(patchResponse.status).json({ error: patchData.error?.message || "Failed to update menu item." });
                }
            }

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json({ success: true, id: item.id });
            } else {
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to write menu item.",
                    details: data
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            
            if (!id) {
                return res.status(400).json({ error: "Missing required parameter (id)." });
            }

            if (isFallbackMode) {
                return res.status(200).json({ success: true, fallback: true });
            }

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/menu/${id}?key=${apiKey}`;
            const response = await fetch(url, { method: 'DELETE' });

            if (response.ok) {
                return res.status(200).json({ success: true });
            } else {
                const data = await response.json();
                return res.status(response.status).json({ error: data.error?.message || "Failed to delete menu item." });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed." });
}

// Private helper to seed database on first run
async function seedDefaultMenu(projectId, apiKey) {
    try {
        console.log("Seeding Firestore with default menu items...");
        for (const item of DEFAULT_MENU_ITEMS) {
            const firestorePayload = {
                fields: {
                    id: { stringValue: item.id },
                    name: { stringValue: item.name },
                    category: { stringValue: item.category },
                    price: { integerValue: parseInt(item.price) || 0 },
                    image: { stringValue: item.image || "" },
                    desc: { stringValue: item.desc || "" },
                    spicy: { booleanValue: !!item.spicy },
                    cooked: { booleanValue: !!item.cooked },
                    raw: { booleanValue: !!item.raw },
                    childFriendly: { booleanValue: !!item.childFriendly },
                    bestSeller: { booleanValue: !!item.bestSeller },
                    isNew: { booleanValue: !!item.isNew }
                }
            };
            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/menu?documentId=${item.id}&key=${apiKey}`;
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firestorePayload)
            });
        }
        console.log("Seeding menu completed!");
    } catch (e) {
        console.error("Auto-seeding menu failed:", e);
    }
}
