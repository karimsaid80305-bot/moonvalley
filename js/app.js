/* ==========================================================================
   MoonValley — Moon Valley Tours · app.js
   Single modular script powering all pages:
   data (tours/destinations) · i18n EN/TR · search & filters · tour modal
   booking form · gallery lightbox · WhatsApp / share · UI behaviours
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
 * 1. CONFIG — central place to edit contact details
 * ------------------------------------------------------------------------ */
const CONFIG = {
  "email": "info@moonvalleytours.com",
  "email2": "susana@moonvalleytours.com",
  "whatsapp": "905396819441",
  "phone": "+90 212 220 0323",
  "phone2": "+90 539 681 9441",
  "address": "Perpa Ticaret Merkezi A Blok Kat:05 No:432 - Sisli/Istanbul",
  "tursab": "A/8271",
  "instagram": "https://www.instagram.com/moonvalleytours",
  "facebook": "https://www.facebook.com/moonvalleytours",
  "mapsEmbed": "https://www.google.com/maps?q=Perpa+Ticaret+Merkezi,+Sisli,+Istanbul,+Turkey&z=15&output=embed",
  "mapsLink": "https://maps.google.com/?q=Perpa+Ticaret+Merkezi,+Sisli,+Istanbul"
};

/* --------------------------------------------------------------------------
 * 2. DATA — destinations & tours (extracted from moonvalleytours.com)
 *    TOURS/DESTS JSON is injected at build time by tools/build.py
 * ------------------------------------------------------------------------ */
const DESTS = [{"slug": "istanbul", "name": {"en": "Istanbul", "tr": "İstanbul", "ar": "إسطنبول", "es": "Estambul"}, "country": {"en": "Turkey", "tr": "Türkiye", "ar": "تركيا", "es": "Turquía"}, "img": "assets/images/dest-istanbul.jpg"}, {"slug": "cappadocia", "name": {"en": "Cappadocia", "tr": "Kapadokya", "ar": "كابادوكيا", "es": "Capadocia"}, "country": {"en": "Turkey", "tr": "Türkiye", "ar": "تركيا", "es": "Turquía"}, "img": "assets/images/dest-cappadocia.jpg"}, {"slug": "bodrum", "name": {"en": "Bodrum", "tr": "Bodrum", "ar": "بودروم", "es": "Bodrum"}, "country": {"en": "Turkey", "tr": "Türkiye", "ar": "تركيا", "es": "Turquía"}, "img": "assets/images/dest-bodrum.jpg"}, {"slug": "fethiye", "name": {"en": "Fethiye", "tr": "Fethiye", "ar": "فتحية", "es": "Fethiye"}, "country": {"en": "Turkey", "tr": "Türkiye", "ar": "تركيا", "es": "Turquía"}, "img": "assets/images/dest-fethiye.jpg"}, {"slug": "pamukkale", "name": {"en": "Pamukkale", "tr": "Pamukkale", "ar": "باموكالي", "es": "Pamukkale"}, "country": {"en": "Turkey", "tr": "Türkiye", "ar": "تركيا", "es": "Turquía"}, "img": "assets/images/dest-pamukkale.jpg"}, {"slug": "dubai", "name": {"en": "Dubai", "tr": "Dubai", "ar": "دبي", "es": "Dubái"}, "country": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri", "ar": "الإمارات العربية المتحدة", "es": "Emiratos Árabes Unidos"}, "img": "assets/images/dest-dubai.jpg"}, {"slug": "abu-dhabi", "name": {"en": "Abu Dhabi", "tr": "Abu Dabi", "ar": "أبوظبي", "es": "Abu Dabi"}, "country": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri", "ar": "الإمارات العربية المتحدة", "es": "Emiratos Árabes Unidos"}, "img": "assets/images/dest-abu-dhabi.jpg"}, {"slug": "london", "name": {"en": "London", "tr": "Londra", "ar": "لندن", "es": "Londres"}, "country": {"en": "England", "tr": "İngiltere", "ar": "إنجلترا", "es": "Inglaterra"}, "img": "assets/images/dest-london.jpg"}, {"slug": "cairo", "name": {"en": "Cairo", "tr": "Kahire", "ar": "القاهرة", "es": "El Cairo"}, "country": {"en": "Egypt", "tr": "Mısır", "ar": "مصر", "es": "Egipto"}, "img": "assets/images/dest-cairo.jpg"}, {"slug": "buenos-aires", "name": {"en": "Buenos Aires", "tr": "Buenos Aires", "ar": "بوينس آيرس", "es": "Buenos Aires"}, "country": {"en": "Argentina", "tr": "Arjantin", "ar": "الأرجنتين", "es": "Argentina"}, "img": "assets/images/dest-buenos-aires.jpg"}];
const TOURS = [{"slug": "bodrum-windmills-old-town-tour", "citySlug": "bodrum", "cityName": {"en": "Bodrum", "tr": "Bodrum"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 18, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/bodrum-windmills-old-town-tour-1.jpg", "assets/images/bodrum-windmills-old-town-tour-2.jpg"], "i18n": {"en": {"title": "Bodrum Windmills & Old Town Walking Tour", "desc": "Climb to Bodrum's hilltop windmills for sweeping harbour views, then wander whitewashed lanes and the ruins of the Mausoleum of Halicarnassus with a local guide.", "dur": "2 hours", "inc": ["2-hour guided walking tour with a local expert", "Entry to the Mausoleum at Halicarnassus", "Tasting at a local olive oil and soap producer", "Detailed neighbourhood map"], "itin": ["Hilltop windmills viewpoint", "Old Town backstreets", "Mausoleum of Halicarnassus", "Marina & bazaar finish"]}, "tr": {"title": "Bodrum Yel Değirmenleri ve Eski Şehir Yürüyüş Turu", "desc": "Yerel bir rehber eşliğinde tepedeki tarihi yel değirmenlerine çıkın; panoramik liman manzarasının ardından Halikarnas Mozolesi'ni ve bembeyaz sokakları keşfedin.", "dur": "2 saat", "inc": ["Yerel uzman rehber eşliğinde 2 saatlik yürüyüş turu", "Halikarnas Mozolesi giriş bileti", "Yerel zeytinyağı ve sabun üreticisinde tadım", "Ayrıntılı mahalle haritası"], "itin": ["Yel değirmenleri seyir noktası", "Eski şehir sokakları", "Halikarnas Mozolesi", "Marina ve çarşı bitişi"]}, "ar": {"title": "جولة مشي عند طواحين الهواء والمدينة القديمة في بودروم", "desc": "اصعد إلى طواحين الهواء على قمة التلال للاستمتاع بإطلالات بانورامية على الميناء، ثم تجوّل في الأزقة البيضاء وأطلال ضريح هاليكارناسوس مع مرشد محلي.", "dur": "ساعتان", "inc": ["جولة مشي مدتها ساعتان مع خبير محلي", "دخول إلى ضريح هاليكارناسوس", "تذوق لدى منتج محلي لزيت الزيتون والصابون", "خريطة تفصيلية للحي"], "itin": ["منظر طواحين الهواء على قمة التل", "شوارع المدينة القديمة", "ضريح هاليكارناسوس", "الميناء والبازار"]}, "es": {"title": "Tour a pie por los Molinos de Viento y el Casco Antiguo de Bodrum", "desc": "Sube hasta los molinos de viento en la colina de Bodrum para vistas panorámicas del puerto, luego pasea por los callejones encalados y las ruinas del Mausoleo de Halicarnaso.", "dur": "2 horas", "inc": ["Tour a pie de 2 horas con experto local", "Entrada al Mausoleo de Halicarnaso", "Degustación en productor local de aceite de oliva y jabón", "Mapa detallado del barrio"], "itin": ["Mirador de los molinos de viento", "Calles del casco antiguo", "Mausoleo de Halicarnaso", "Puerto y bazar"]}}}, {"slug": "bodrum-castle-underwater-museum", "citySlug": "bodrum", "cityName": {"en": "Bodrum", "tr": "Bodrum"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 22, "freeCancellation": false, "hotelPickup": false, "images": ["assets/images/bodrum-castle-underwater-museum-1.jpg", "assets/images/bodrum-castle-underwater-museum-2.jpg"], "i18n": {"en": {"title": "Bodrum Castle & Museum of Underwater Archaeology", "desc": "Step inside the 15th-century Castle of St Peter and discover the world-famous Museum of Underwater Archaeology, home to ancient shipwrecks and Aegean treasure.", "dur": "2.5 hours", "inc": ["Castle entry ticket", "Museum of Underwater Archaeology access", "Self-guided visit with orientation map"], "itin": ["Castle ramparts & towers", "Shipwreck halls", "Glass Wreck exhibition", "Harbour views"]}, "tr": {"title": "Bodrum Kalesi ve Sualtı Arkeoloji Müzesi", "desc": "15. yüzyıldan kalma St. Peter Kalesi'ni gezin; antik batıklar ve Ege hazineleriyle dünyaca ünlü Sualtı Arkeoloji Müzesi'ni keşfedin.", "dur": "2,5 saat", "inc": ["Kale giriş bileti", "Sualtı Arkeoloji Müzesi girişi", "Yönlendirme haritalı serbest gezi"], "itin": ["Kale surları ve kuleleri", "Batık gemi salonları", "Cam Batığı sergisi", "Liman manzaraları"]}, "ar": {"title": "قلعة بودروم ومتحف الآثار المائية", "desc": "ادخل قلعة القديس بطرس من القرن الخامس عشر واكتشف متحف الآثار المائية الشهير عالمياً، موطن حطام السفن القديمة وكنوز بحر إيجة.", "dur": "ساعتان ونصف", "inc": ["تذكرة دخول القلعة", "دخول متحف الآثار المائية", "زيارة ذاتية مع خريطة إرشادية"], "itin": ["أسوار وأبراج القلعة", "قاعات حطام السفن", "معرض حطام الزجاج", "مناظر الميناء"]}, "es": {"title": "Castillo de Bodrum y Museo de Arqueología Submarina", "desc": "Entra en el Castillo de San Pedro del siglo XV y descubre el mundialmente famoso Museo de Arqueología Submarina, hogar de naufragios y tesoros del Egeo.", "dur": "2,5 horas", "inc": ["Entrada al castillo", "Acceso al Museo de Arqueología Submarina", "Visita autoguiada con mapa de orientación"], "itin": ["Murallas y torres del castillo", "Salas de naufragios", "Exposición del Pecio de Vidrio", "Vistas al puerto"]}}}, {"slug": "london-buckingham-palace-royal-parks", "citySlug": "london", "cityName": {"en": "London", "tr": "Londra"}, "countryName": {"en": "England", "tr": "İngiltere"}, "price": 22, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/london-buckingham-palace-royal-parks-1.jpg", "assets/images/london-buckingham-palace-royal-parks-2.jpg"], "i18n": {"en": {"title": "Buckingham Palace Changing of the Guard & Royal Parks Walk", "desc": "Catch the pageantry of the Changing of the Guard from the best vantage points, then stroll St James's Park and Hyde Park with a storytelling local guide.", "dur": "3 hours", "inc": ["Expert local guide throughout (3 hours)", "Best-position viewing of the ceremony", "St James's Park guided history walk", "Hyde Park hidden stories & Speakers' Corner", "Afternoon-tea recommendation at a historic café"], "itin": ["St James's Park Blue Bridge meeting point", "Changing of the Guard ceremony", "St James's Park", "Hyde Park & Speakers' Corner"]}, "tr": {"title": "Buckingham Sarayı Nöbet Değişimi ve Kraliyet Parkları Yürüyüşü", "desc": "Nöbet Değişimi törenini en iyi noktalardan izleyin, ardından yerel rehberinizle St James's Park ve Hyde Park'ta keyifli bir yürüyüş yapın.", "dur": "3 saat", "inc": ["3 saat boyunca uzman yerel rehber", "Tören için en iyi izleme noktası", "St James's Park tarih yürüyüşü", "Hyde Park'ın gizli hikâyeleri ve Speakers' Corner", "Tarihi kafede ikindi çayı önerisi"], "itin": ["St James's Park Blue Bridge buluşma noktası", "Nöbet Değişimi töreni", "St James's Park", "Hyde Park ve Speakers' Corner"]}, "ar": {"title": "تغيير الحرس في قصر باكنغهام والمشي في الحدائق الملكية", "desc": "اشهد مراسم تغيير الحرس من أفضل المواقع، ثم تجوّل في حديقة سانت جيمس وهايد بارك مع مرشد محلي.", "dur": "3 ساعات", "inc": ["مرشد محلي خبير طوال 3 ساعات", "أفضل موقع لمشاهدة المراسم", "جولة تاريخية مرشدة في حديقة سانت جيمس", "قصص مخفية في هايد بارك وركن المتحدثين", "توصية بشاي العصر في مقهى تاريخي"], "itin": ["نقطة التجمع عند الجسر الأزرق في حديقة سانت جيمس", "مراسم تغيير الحرس", "حديقة سانت جيمس", "هايد بارك وركن المتحدثين"]}, "es": {"title": "Cambio de Guardia en el Palacio de Buckingham y Paseo por los Parques Reales", "desc": "Disfruta del Cambio de Guardia desde los mejores puntos, luego pasea por St James's Park y Hyde Park con un guía local.", "dur": "3 horas", "inc": ["Guía local experto durante 3 horas", "Mejor posición para ver la ceremonia", "Paseo histórico guiado por St James's Park", "Historias de Hyde Park y Speakers' Corner", "Recomendación de té de la tarde en café histórico"], "itin": ["Punto de encuentro en Blue Bridge de St James's Park", "Ceremonia de cambio de guardia", "St James's Park", "Hyde Park y Speakers' Corner"]}}}, {"slug": "bodrum-aegean-sunset-sailing", "citySlug": "bodrum", "cityName": {"en": "Bodrum", "tr": "Bodrum"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 55, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/bodrum-aegean-sunset-sailing-1.jpg", "assets/images/bodrum-aegean-sunset-sailing-2.jpg", "assets/images/bodrum-aegean-sunset-sailing-3.jpg"], "i18n": {"en": {"title": "Aegean Sunset Sailing Cruise", "desc": "Board a traditional gulet for an open-Aegean evening: swim stops in private coves, a meze platter on deck and a sunset anchorage off Black Island.", "dur": "5 hours", "inc": ["5-hour sailing trip (16:00–21:00)", "Meze platter on board", "Open bar: beer, wine and soft drinks", "3 swimming stops in private coves", "Sunset anchorage at Black Island (Kara Ada)"], "itin": ["Bodrum marina departure", "Private cove swim stops", "Black Island (Kara Ada)", "Sunset return"]}, "tr": {"title": "Ege'de Gün Batımı Yelken Turu", "desc": "Geleneksel bir gulet ile Ege'ye açılın: koylarda yüzme molaları, güvertede meze tabağı ve Kara Ada açıklarında gün batımı demirleyişi.", "dur": "5 saat", "inc": ["5 saatlik yelken turu (16:00–21:00)", "Teknede meze tabağı", "Açık bar: bira, şarap ve meşrubat", "Koylarda 3 yüzme molası", "Kara Ada'da gün batımı demirleyişi"], "itin": ["Bodrum marinadan kalkış", "Koylarda yüzme molaları", "Kara Ada", "Gün batımında dönüş"]}, "ar": {"title": "رحلة إبحار عند غروب الشمس في بحر إيجة", "desc": "ارقب غروب الشمس على متن غولت تقليدي: توقفات للسباحة في خلجان خاصة، وطبق مزة على سطح السفينة، وإرساء عند جزيرة كارا أدا.", "dur": "5 ساعات", "inc": ["رحلة إبحار 5 ساعات (16:00–21:00)", "طبق مزة على متن السفينة", "بار مفتوح: بيرة، نبيذ ومشروبات غازية", "3 توقفات للسباحة في خلجان خاصة", "إرساء عند غروب الشمس قرب جزيرة كارا أدا"], "itin": ["المغادرة من ميناء بودروم", "توقفات سباحة في الخلجان", "جزيرة كارا أدا", "العودة عند الغروب"]}, "es": {"title": "Crucero al Atardecer en el Egeo", "desc": "Embárcate en un gulet tradicional: paradas para nadar en calas privadas, meze en cubierta y fondeo al atardecer frente a la Isla Negra.", "dur": "5 horas", "inc": ["Viaje en velero 5 horas (16:00–21:00)", "Bandeja de meze a bordo", "Barra libre: cerveza, vino y refrescos", "3 paradas para nadar en calas privadas", "Fondeo al atardecer en Isla Negra (Kara Ada)"], "itin": ["Salida desde el puerto de Bodrum", "Paradas para nadar en calas", "Isla Negra (Kara Ada)", "Regreso al atardecer"]}}}, {"slug": "istanbul-bosphorus-sunset-cruise", "citySlug": "istanbul", "cityName": {"en": "Istanbul", "tr": "İstanbul"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 45, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/istanbul-bosphorus-sunset-cruise-1.jpg", "assets/images/istanbul-bosphorus-sunset-cruise-3.jpg"], "i18n": {"en": {"title": "Bosphorus Sunset Cruise", "desc": "Glide along the strait that divides two continents as the sun drops behind minarets and Ottoman palaces — Turkish tea and live commentary included.", "dur": "2.5 hours", "inc": ["Turkish tea and snacks on board", "Live commentary on landmarks", "Round trip from hotel pickup point", "Professional licensed guide"], "itin": ["Golden Horn departure", "Dolmabahçe & Ortaköy shoreline", "Bosphorus Bridge", "Rumeli Fortress", "Sunset return"]}, "tr": {"title": "Boğaz'da Gün Batımı Turu", "desc": "Güneş minarelerin ve Osmanlı saraylarının ardında batarken iki kıtayı ayıran Boğaz'da süzülün — Türk çayı ve canlı anlatım dahil.", "dur": "2,5 saat", "inc": ["Teknede Türk çayı ve ikramlar", "Canlı rehber anlatımı", "Buluşma noktasından gidiş-dönüş", "Lisanslı profesyonel rehber"], "itin": ["Haliç'ten kalkış", "Dolmabahçe ve Ortaköy sahili", "Boğaziçi Köprüsü", "Rumeli Hisarı", "Gün batımında dönüş"]}, "ar": {"title": "رحلة إبحار عند غروب الشمس في مضيق البوسفور", "desc": "انزلق عبر المضيق الذي يفصل قارتين بينما تغرب الشمس خلف المآذن والقصور العثمانية — الشاي التركي وتعليق حي مشمولان.", "dur": "ساعتان ونصف", "inc": ["شاي تركي وخفيفات على متن السفينة", "تعليق حي على المعالم", "ذهاب وإياب من نقطة الالتقاء", "مرشد محترف مرخص"], "itin": ["المغادرة من القرن الذهبي", "شاطئ دولمابهشة وأورتاكوي", "جسر البوسفور", "قلعة روميلي", "العودة عند الغروب"]}, "es": {"title": "Crucero al Atardecer por el Bósforo", "desc": "Navega por el estrecho que divide dos continentes mientras el sol se oculta tras los minaretes y palacios otomanos — té turco y comentarios en vivo incluidos.", "dur": "2,5 horas", "inc": ["Té turco y aperitivos a bordo", "Comentarios en vivo sobre los monumentos", "Ida y vuelta desde el punto de recogida", "Guía profesional con licencia"], "itin": ["Salida desde el Cuerno de Oro", "Orilla de Dolmabahçe y Ortaköy", "Puente del Bósforo", "Fortaleza de Rumeli", "Regreso al atardecer"]}}}, {"slug": "dubai-burj-khalifa-at-the-top", "citySlug": "dubai", "cityName": {"en": "Dubai", "tr": "Dubai"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 55, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/dubai-burj-khalifa-at-the-top-1.jpg", "assets/images/dubai-burj-khalifa-at-the-top-2.jpg"], "i18n": {"en": {"title": "Burj Khalifa At the Top — Level 124 & 125", "desc": "Ride the world's fastest lifts to levels 124–125 of the tallest building on Earth and take in Dubai from high above the desert.", "dur": "1.5 hours", "inc": ["Priority-access ticket to Levels 124 & 125", "Audio guide available in 12 languages", "Dubai Fountain viewing from the terrace (evening slots)", "Digital souvenir photo"], "itin": ["Dubai Mall entrance", "High-speed elevator ascent", "Observation decks 124–125", "Dubai Fountain view"]}, "tr": {"title": "Burj Khalifa \"At the Top\" — 124 ve 125. Katlar", "desc": "Dünyanın en hızlı asansörleriyle dünyanın en yüksek binasının 124–125. katlarına çıkın ve Dubai'yi çölün yüzlerce metre üzerinden izleyin.", "dur": "1,5 saat", "inc": ["Öncelikli giriş bileti (124 ve 125. katlar)", "12 dilde sesli rehber", "Terastan Dubai Fountain izleme (akşam seansları)", "Dijital hatıra fotoğrafı"], "itin": ["Dubai Mall girişi", "Yüksek hızlı asansörle çıkış", "124–125. kat seyir terasları", "Dubai Fountain manzarası"]}, "ar": {"title": "برج خليفة At the Top — الطابقان 124 و125", "desc": "اركب أسرع مصاعد العالم إلى الطابقين 124–125 في أطول مبنى على وجه الأرض واستمتع بمشهد دبي من أعلى الصحراء.", "dur": "ساعة ونصف", "inc": ["تذكرة دخول مميزة للطابقين 124 و125", "مرشد صوتي بـ 12 لغة", "مشاهدة نافورة دبي من الشرفة (جلسات مسائية)", "صورة تذكارية رقمية"], "itin": ["مدخل دبي مول", "الصعود بالمصعد السريع", "مناصف المراقبة 124–125", "مشهد نافورة دبي"]}, "es": {"title": "Burj Khalifa At the Top — Niveles 124 y 125", "desc": "Sube en los ascensores más rápidos del mundo hasta los niveles 124–125 del edificio más alto de la Tierra y contempla Dubái desde lo alto.", "dur": "1,5 horas", "inc": ["Entrada prioritaria a los niveles 124 y 125", "Audioguía disponible en 12 idiomas", "Vista de la Fuente de Dubái desde la terraza", "Foto digital de recuerdo"], "itin": ["Entrada por Dubai Mall", "Ascenso en ascensor de alta velocidad", "Terrazas de observación 124–125", "Vista de la Fuente de Dubái"]}}}, {"slug": "pamukkale-cleopatras-pool", "citySlug": "pamukkale", "cityName": {"en": "Pamukkale", "tr": "Pamukkale"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 28, "freeCancellation": false, "hotelPickup": false, "images": ["assets/images/pamukkale-cleopatras-pool-1.jpg", "assets/images/pamukkale-cleopatras-pool-2.jpg"], "i18n": {"en": {"title": "Cleopatra's Antique Pool Swim", "desc": "Bathe in warm mineral water above sunken Roman columns in the legendary thermal pool said to be Cleopatra's gift.", "dur": "2 hours", "inc": ["Sacred Pool entry ticket", "Locker rental", "Towel", "Refreshment voucher (juice or water)"], "itin": ["Hierapolis entrance", "Antique Pool swim", "Free time"]}, "tr": {"title": "Kleopatra Antik Havuzu'nda Yüzme", "desc": "Efsaneye göre Kleopatra'ya armağan edilen antik termal havuzda, su altındaki Roma sütunlarının üzerinde ılık mineralli suların keyfini çıkarın.", "dur": "2 saat", "inc": ["Antik Havuz giriş bileti", "Dolap kiralama", "Havlu", "İçecek kuponu (meyve suyu veya su)"], "itin": ["Hierapolis girişi", "Antik Havuz'da yüzme", "Serbest zaman"]}, "ar": {"title": "السباحة في بركة كليوباترا القديمة", "desc": "استحمّ في مياه معدنية دافئة فوق أعمدة رومانية غارقة في البركة الحرارية الأسطورية التي يُقال إنها هدية كليوباترا.", "dur": "ساعتان", "inc": ["تذكرة دخول البركة المقدسة", "استئجار خزانة", "منشفة", "قسيمة مشروبات (عصير أو ماء)"], "itin": ["مدخل هيرابوليس", "السباحة في البركة القديمة", "وقت حر"]}, "es": {"title": "Baño en la Piscina Antigua de Cleopatra", "desc": "Báñate en agua mineral tibia sobre columnas romanas hundidas en la legendaria piscina termal que dicen fue un regalo de Cleopatra.", "dur": "2 horas", "inc": ["Entrada a la Piscina Sagrada", "Alquiler de taquilla", "Toalla", "Vale de refresco (zumo o agua)"], "itin": ["Entrada a Hierápolis", "Baño en la Piscina Antigua", "Tiempo libre"]}}}, {"slug": "pamukkale-thermal-pools-hierapolis", "citySlug": "pamukkale", "cityName": {"en": "Pamukkale", "tr": "Pamukkale"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 35, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/pamukkale-thermal-pools-hierapolis-1.jpg"], "i18n": {"en": {"title": "Cotton Castle Thermal Pools & Hierapolis Ruins", "desc": "Walk barefoot across the dazzling white travertine terraces, then explore the Greco-Roman city of Hierapolis perched above them.", "dur": "4 hours", "inc": ["Pamukkale park entrance fee", "Guided walk through Hierapolis ruins", "Free time in the thermal pools", "Hotel pickup and drop-off from Pamukkale town"], "itin": ["Travertine terraces", "Hierapolis theatre", "Necropolis", "Thermal pools free time"]}, "tr": {"title": "Pamukkale Travertenleri ve Hierapolis Antik Kenti", "desc": "Göz kamaştıran beyaz travertenlerde çıplak ayakla yürüyün, ardından hemen üzerindeki Greko-Romen kenti Hierapolis'i keşfedin.", "dur": "4 saat", "inc": ["Ören yeri giriş ücreti", "Rehberli Hierapolis turu", "Travertenlerde serbest zaman", "Pamukkale merkezden otel transferi"], "itin": ["Traverten terasları", "Hierapolis tiyatrosu", "Nekropol", "Termal havuzlarda serbest zaman"]}, "ar": {"title": "البرك الحرارية وآثار هيرابوليس في باموكالي", "desc": "امشِ حافي القدمين على التراسات البيضاء المبهرة لقلعة القطن، ثم استكشف مدينة هيرابوليس اليونانية الرومانية.", "dur": "4 ساعات", "inc": ["رسوم دخول حديقة باموكالي", "جولة مرشدة في آثار هيرابوليس", "وقت حر في البرك الحرارية", "نقل من مدينة باموكالي"], "itin": ["تراسات الترافرتين", "مسرح هيرابوليس", "المدافن", "وقت حر في البرك الحرارية"]}, "es": {"title": "Piscinas Termales del Castillo de Algodón y Ruinas de Hierápolis", "desc": "Camina descalzo por las deslumbrantes terrazas blancas de travertino, luego explora la ciudad grecorromana de Hierápolis.", "dur": "4 horas", "inc": ["Entrada al parque de Pamukkale", "Paseo guiado por las ruinas de Hierápolis", "Tiempo libre en piscinas termales", "Traslado desde la ciudad de Pamukkale"], "itin": ["Terrazas de travertino", "Teatro de Hierápolis", "Necrópolis", "Tiempo libre en piscinas termales"]}}}, {"slug": "dubai-creek-old-souk-tour", "citySlug": "dubai", "cityName": {"en": "Dubai", "tr": "Dubai"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 28, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/dubai-creek-old-souk-tour-1.jpg", "assets/images/dubai-creek-old-souk-tour-2.jpg"], "i18n": {"en": {"title": "Dubai Creek & Old Souk Abra Ride", "desc": "Cross Dubai Creek aboard a wooden abra and dive into old Dubai: gold, spices, karak chai and the stories of the city before the skyscrapers.", "dur": "3 hours", "inc": ["Guided 3-hour walking tour", "Abra (wooden water taxi) creek crossing", "Gold Souk visit with expert buying advice", "Spice Souk tasting tour", "Traditional karak chai at a historic Deira teahouse"], "itin": ["Al Fahidi historic district", "Abra ride across the Creek", "Spice Souk", "Gold Souk", "Deira teahouse"]}, "tr": {"title": "Dubai Creek ve Eski Çarşılar Abra Turu", "desc": "Ahşap bir abra ile Dubai Creek'i geçin; altın ve baharat çarşılarında, karak çayı eşliğinde gökdelenlerden önceki Dubai'yi keşfedin.", "dur": "3 saat", "inc": ["3 saatlik rehberli yürüyüş turu", "Abra (ahşap deniz taksisi) ile Creek geçişi", "Altın Çarşısı gezisi ve alışveriş tavsiyeleri", "Baharat Çarşısı tadım turu", "Tarihi Deira çay evinde karak çayı"], "itin": ["Al Fahidi tarihi bölgesi", "Abra ile Creek geçişi", "Baharat Çarşısı", "Altın Çarşısı", "Deira çay evi"]}, "ar": {"title": "خور دبي وركوب العبرة في الأسواق القديمة", "desc": "اعبر خور دبي على متن عبرة خشبية وانغمس في دبي القديمة: ذهب وتوابل وشاي كراك وقصص المدينة قبل ناطحات السحاب.", "dur": "3 ساعات", "inc": ["جولة مشي مرشدة مدتها 3 ساعات", "عبور الخور على متن عبرة (تاكسي مائي خشبي)", "زيارة سوق الذهب مع نصائح شراء", "جولة تذوق في سوق البهارات", "شاي كراك تقليدي في مقهى ديرة التاريخي"], "itin": ["منطقة الفهيدي التاريخية", "عبور الخور بالعبرة", "سوق البهارات", "سوق الذهب", "مقهى ديرة"]}, "es": {"title": "Dubai Creek y Paseo en Abra por el Antiguo Zoco", "desc": "Cruza el Dubai Creek en un abra de madera y sumérgete en el viejo Dubái: oro, especias, karak chai e historias antes de los rascacielos.", "dur": "3 horas", "inc": ["Tour a pie guiado de 3 horas", "Cruce del Creek en abra (taxi acuático de madera)", "Visita al Zoco del Oro con consejos de compra", "Tour de degustación por el Zoco de las Especias", "Té karak tradicional en antigua tetería de Deira"], "itin": ["Distrito histórico de Al Fahidi", "Cruce del Creek en abra", "Zoco de las Especias", "Zoco del Oro", "Tetería de Deira"]}}}, {"slug": "dubai-desert-safari-bbq", "citySlug": "dubai", "cityName": {"en": "Dubai", "tr": "Dubai"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 70, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/dubai-desert-safari-bbq-1.jpg", "assets/images/dubai-desert-safari-bbq-2.jpg", "assets/images/dubai-desert-safari-bbq-3.jpg"], "i18n": {"en": {"title": "Dubai Desert Safari with BBQ Dinner", "desc": "Charge over red dunes in a 4x4, ride a camel into the sunset and feast on a Bedouin-camp BBQ under the stars with live shows.", "dur": "6 hours", "inc": ["Hotel pickup and drop-off", "Dune bashing in a 4x4 (45 minutes)", "Sunset camel ride", "Sandboarding session", "Henna painting", "Bedouin camp BBQ dinner (vegetarian option)", "Belly dance & Tanoura show", "Unlimited soft drinks, tea and Arabic coffee"], "itin": ["Hotel pickup", "Dune bashing", "Camel ride & sandboarding", "Bedouin camp dinner & shows", "Return transfer"]}, "tr": {"title": "Çöl Safarisi ve Barbekü Akşam Yemeği", "desc": "4x4 ile kızıl kum tepelerinde safari yapın, gün batımında deveye binin ve yıldızların altında canlı gösteriler eşliğinde barbekünün tadını çıkarın.", "dur": "6 saat", "inc": ["Otelden alma ve bırakma", "4x4 ile kum safarisi (45 dakika)", "Gün batımında deve binişi", "Kum kayağı", "Kına sanatı", "Bedevi kampında barbekü akşam yemeği (vejetaryen seçenek)", "Oryantal dans ve Tanura gösterisi", "Sınırsız meşrubat, çay ve Arap kahvesi"], "itin": ["Otelden alış", "Kum tepelerinde sürüş", "Deve binişi ve kum kayağı", "Bedevi kampında yemek ve gösteriler", "Dönüş transferi"]}, "ar": {"title": "سفاري الصحراء مع عشاء الشواء في دبي", "desc": "اندفع فوق الكثبان الحمراء بسيارة 4x4، اركب جملاً عند الغروب واستمتع بعشاء شواء في مخيم بدوي تحت النجوم مع عروض حية.", "dur": "6 ساعات", "inc": ["نقل من وإلى الفندق", "تزلج على الكثبان بسيارة 4x4 (45 دقيقة)", "ركوب جمل عند الغروب", "جلسة التزلج على الرمال", "نقش الحناء", "عشاء شواء في مخيم بدوي (خيار نباتي)", "عرض الرقص الشرقي والتنورة", "مشروبات وشاي وقهوة عربية غير محدودة"], "itin": ["الاستقبال من الفندق", "التزلج على الكثبان", "ركوب الجمال والتزلج على الرمال", "عشاء وعروض في المخيم البدوي", "العودة"]}, "es": {"title": "Safari por el Desierto de Dubái con Cena BBQ", "desc": "Recorre dunas rojas en 4x4, cabalga un camello al atardecer y disfruta de una cena BBQ en campamento beduino bajo las estrellas con espectáculos en vivo.", "dur": "6 horas", "inc": ["Traslado desde y hacia el hotel", "Deslizamiento por dunas en 4x4 (45 minutos)", "Paseo en camello al atardecer", "Sesión de sandboard", "Pintura de henna", "Cena BBQ en campamento beduino (opción vegetariana)", "Espectáculo de danza del vientre y Tanoura", "Refrescos, té y café árabe ilimitados"], "itin": ["Recogida en el hotel", "Deslizamiento por dunas", "Paseo en camello y sandboard", "Cena y espectáculos en campamento beduino", "Traslado de vuelta"]}}}, {"slug": "cairo-egyptian-museum-khan-khalili", "citySlug": "cairo", "cityName": {"en": "Cairo", "tr": "Kahire"}, "countryName": {"en": "Egypt", "tr": "Mısır"}, "price": 48, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/cairo-egyptian-museum-khan-khalili-1.jpg", "assets/images/cairo-egyptian-museum-khan-khalili-2.jpg"], "i18n": {"en": {"title": "Egyptian Museum & Khan el-Khalili Bazaar", "desc": "Stand before Tutankhamun's golden treasures, then haggle for spices and silver in the medieval lanes of Khan el-Khalili bazaar.", "dur": "6 hours", "inc": ["Egyptian Museum entry ticket", "Tutankhamun treasure hall visit", "Khan el-Khalili guided orientation tour", "Traditional lunch in Islamic Cairo", "Licensed guide throughout"], "itin": ["Egyptian Museum", "Tutankhamun galleries", "Lunch in Islamic Cairo", "Khan el-Khalili bazaar"]}, "tr": {"title": "Mısır Müzesi ve Han el-Halili Çarşısı", "desc": "Tutankamon'un altın hazinelerini yakından görün, ardından Orta Çağ'dan kalma Han el-Halili çarşısında baharat ve gümüş pazarlığı yapın.", "dur": "6 saat", "inc": ["Mısır Müzesi giriş bileti", "Tutankamon hazine salonu ziyareti", "Han el-Halili rehberli turu", "İslami Kahire'de geleneksel öğle yemeği", "Tur boyunca lisanslı rehber"], "itin": ["Mısır Müzesi", "Tutankamon galerileri", "İslami Kahire'de öğle yemeği", "Han el-Halili çarşısı"]}, "ar": {"title": "المتحف المصري وبازار خان الخليلي", "desc": "قف أمام كنوز توت عنخ آمون الذهبية، ثم تفاوض على التوابل والفضة في أزقة خان الخليلي المتوسطية.", "dur": "6 ساعات", "inc": ["تذكرة دخول المتحف المصري", "زيارة قاعة كنوز توت عنخ آمون", "جولة إرشادية مرشدة في خان الخليلي", "غداء تقليدي في القاهرة الإسلامية", "مرشد مرخص طوال الرحلة"], "itin": ["المتحف المصري", "معارض توت عنخ آمون", "الغداء في القاهرة الإسلامية", "بازار خان الخليلي"]}, "es": {"title": "Museo Egipcio y Bazar Khan el-Khalili", "desc": "Contempla los tesoros de Tutankamón, luego regatea especias y plata en los callejones medievales del bazar Khan el-Khalili.", "dur": "6 horas", "inc": ["Entrada al Museo Egipcio", "Visita a la sala del tesoro de Tutankamón", "Tour de orientación guiado por Khan el-Khalili", "Almuerzo tradicional en El Cairo islámico", "Guía con licencia durante todo el recorrido"], "itin": ["Museo Egipcio", "Galerías de Tutankamón", "Almuerzo en El Cairo islámico", "Bazar Khan el-Khalili"]}}}, {"slug": "abu-dhabi-ferrari-world", "citySlug": "abu-dhabi", "cityName": {"en": "Abu Dhabi", "tr": "Abu Dabi"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 95, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/abu-dhabi-ferrari-world-1.jpg", "assets/images/abu-dhabi-ferrari-world-2.jpg"], "i18n": {"en": {"title": "Ferrari World Abu Dhabi Full Day", "desc": "Spend a full day under the world's largest indoor theme-park roof — home of Formula Rossa, the fastest roller coaster on Earth.", "dur": "Full day", "inc": ["Full-day park admission", "Unlimited ride access", "Hotel transfer from Abu Dhabi", "Meal voucher (one main course)"], "itin": ["Formula Rossa — fastest coaster on Earth", "Turbo Track", "Flying Aces", "Galleria Ferrari exhibition", "Driving simulators & pit-stop challenge"]}, "tr": {"title": "Ferrari World Abu Dabi — Tam Gün", "desc": "Dünyanın en hızlı roller coaster'ı Formula Rossa'ya ev sahipliği yapan dev kapalı tema parkında tam gün eğlence.", "dur": "Tam gün", "inc": ["Tam gün park girişi", "Sınırsız oyuncak erişimi", "Abu Dabi otellerinden transfer", "Yemek kuponu (bir ana yemek)"], "itin": ["Formula Rossa — dünyanın en hızlısı", "Turbo Track", "Flying Aces", "Galleria Ferrari sergisi", "Sürüş simülatörleri ve pit-stop yarışı"]}, "ar": {"title": "فيراري وورلد أبوظبي — يوم كامل", "desc": "اقضِ يوماً كاملاً تحت سقف أكبر مدينة ملاهي مغطاة في العالم — موطن فورمولا روسا، أسرع ألعاب الإثارة على وجه الأرض.", "dur": "يوم كامل", "inc": ["دخول الحديقة ليوم كامل", "وصول غير محدود إلى الألعاب", "نقل من فنادق أبوظبي", "قسيمة وجبة (طبق رئيسي واحد)"], "itin": ["فورمولا روسا — الأسرع في العالم", "توربو تراك", "فلاينغ إيسس", "معرض غاليريا فيراري", "محاكيات القيادة وتحدي المسابقة"]}, "es": {"title": "Ferrari World Abu Dabi — Día Completo", "desc": "Pasa un día completo bajo el techo del parque temático cubierto más grande del mundo — sede de Formula Rossa, la montaña rusa más rápida de la Tierra.", "dur": "Día completo", "inc": ["Admisión al parque por el día completo", "Acceso ilimitado a atracciones", "Traslado desde hoteles de Abu Dabi", "Vale de comida (un plato principal)"], "itin": ["Formula Rossa — la más rápida del mundo", "Turbo Track", "Flying Aces", "Exposición Galleria Ferrari", "Simuladores de conducción y desafío pit-stop"]}}}, {"slug": "capadoccia-goreme-open-air-museum", "citySlug": "cappadocia", "cityName": {"en": "Cappadocia", "tr": "Kapadokya"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 30, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/capadoccia-goreme-open-air-museum-1.jpg", "assets/images/capadoccia-goreme-open-air-museum-2.jpg"], "i18n": {"en": {"title": "Göreme Open Air Museum & Cave Church Frescoes", "desc": "Wander a UNESCO-listed valley of Byzantine cave churches where thousand-year-old frescoes still glow on the rock walls.", "dur": "2 hours", "inc": ["UNESCO site entry ticket", "Licensed local guide (2 hours)", "Optional audio guide in 6 languages (paid on site)"], "itin": ["Göreme Open Air Museum", "Cave chapels & monasteries", "Dark Church (optional extra)", "Fresco highlights walk"]}, "tr": {"title": "Göreme Açık Hava Müzesi ve Kaya Kiliseleri", "desc": "Bin yıllık freskleri hâlâ kaya duvarlarında parlayan Bizans kaya kiliseleriyle dolu UNESCO listesindeki vadiyi keşfedin.", "dur": "2 saat", "inc": ["UNESCO ören yeri giriş bileti", "Lisanslı yerel rehber (2 saat)", "Opsiyonel sesli rehber — 6 dil (yerinde ödenir)"], "itin": ["Göreme Açık Hava Müzesi", "Kaya şapelleri ve manastırlar", "Karanlık Kilise (opsiyonel)", "Fresk turu"]}, "ar": {"title": "متحف غوريمي في الهواء الطلق ولوحات الكنائس الكهفية", "desc": "تجوّل في وادٍ مدرج على قائمة اليونسكو مليء بكنائس بيزنطية كهفية لا تزال لوحاتها الألفية تتألق على جدران الصخر.", "dur": "ساعتان", "inc": ["تذكرة دخول موقع اليونسكو", "مرشد محلي مرخص (ساعتان)", "مرشد صوتي اختياري بـ 6 لغات (يُدفع في الموقع)"], "itin": ["متحف غوريمي في الهواء الطلق", "الكنائس والأديرة الكهفية", "الكنيسة المظلمة (اختياري)", "جولة أبرز اللوحات"]}, "es": {"title": "Museo al Aire Libre de Göreme y Frescos de Iglesias en Cueva", "desc": "Recorre un valle con iglesias rupestres bizantinas Patrimonio de la Humanidad donde frescos milenarios aún brillan en las paredes de roca.", "dur": "2 horas", "inc": ["Entrada al sitio UNESCO", "Guía local con licencia (2 horas)", "Audioguía opcional en 6 idiomas (pago en el lugar)"], "itin": ["Museo al Aire Libre de Göreme", "Capillas y monasterios en cuevas", "Iglesia Oscura (opcional)", "Recorrido por los frescos más destacados"]}}}, {"slug": "capadoccia-hot-air-balloon-sunrise", "citySlug": "cappadocia", "cityName": {"en": "Cappadocia", "tr": "Kapadokya"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 185, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/capadoccia-hot-air-balloon-sunrise-1.jpg", "assets/images/capadoccia-hot-air-balloon-sunrise-3.jpg"], "i18n": {"en": {"title": "Hot Air Balloon Ride at Sunrise", "desc": "Lift off at first light and float over fairy chimneys and rose-pink valleys — finished with a champagne toast and your flight certificate.", "dur": "3.5 hours", "inc": ["1-hour flight over Göreme Valley and Rose Valley", "Champagne breakfast on landing", "CAA-certified pilot with 1,000+ flights", "Flight certificate", "Hotel transfer"], "itin": ["Pre-dawn hotel pickup", "Balloon inflation & briefing", "1-hour sunrise flight", "Champagne landing ceremony"]}, "tr": {"title": "Gün Doğumunda Sıcak Hava Balonu Turu", "desc": "Gün ışırken havalanın, peribacaları ve gül kurusu vadilerin üzerinde süzülün — iniş sonrası şampanyalı kutlama ve uçuş sertifikası sizi bekliyor.", "dur": "3,5 saat", "inc": ["Göreme ve Güllüdere vadileri üzerinde 1 saatlik uçuş", "İnişte şampanyalı kahvaltı", "Sertifikalı pilot (1.000+ uçuş)", "Uçuş sertifikası", "Otel transferi"], "itin": ["Şafak öncesi otelden alış", "Balonun hazırlanması ve bilgilendirme", "1 saatlik gün doğumu uçuşu", "Şampanyalı iniş töreni"]}, "ar": {"title": "رحلة بالون الهواء الساخن عند الشروق", "desc": "انطلق مع أول خيوط الفجر وحلّق فوق مداخن الجان والوديان الورديات — مع نخب الشمبانيا وشهادة طيرانك عند الانتهاء.", "dur": "3.5 ساعات", "inc": ["رحلة طيران لمدة ساعة فوق وادي غوريمي ووادي الورد", "إفطار مع شمبانيا عند الهبوط", "طيار معتمد CAA بأكثر من 1000 رحلة", "شهادة طيران", "نقل من الفندق"], "itin": ["الاستقبال من الفندق قبل الفجر", "نفخ البالون والإحاطة", "رحلة طيران لساعة عند الشروق", "احتفال الهبوط بالشمبانيا"]}, "es": {"title": "Vuelo en Globo Aerostático al Amanecer", "desc": "Despega al primer amanecer y flota sobre chimeneas de hadas y valles rosa — con brindis de champán y tu certificado de vuelo al finalizar.", "dur": "3,5 horas", "inc": ["1 hora de vuelo sobre Valle de Göreme y Valle de la Rosa", "Desayuno con champán al aterrizar", "Piloto certificado CAA con más de 1.000 vuelos", "Certificado de vuelo", "Traslado desde el hotel"], "itin": ["Recogida en el hotel antes del amanecer", "Inflado del globo e instrucciones", "1 hora de vuelo al amanecer", "Ceremonia de aterrizaje con champán"]}}}, {"slug": "buenos-aires-la-boca-caminito", "citySlug": "buenos-aires", "cityName": {"en": "Buenos Aires", "tr": "Buenos Aires"}, "countryName": {"en": "Argentina", "tr": "Arjantin"}, "price": 30, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/buenos-aires-la-boca-caminito-1.jpg"], "i18n": {"en": {"title": "La Boca & Caminito Street Art Walk", "desc": "Explore the painted houses and street art of La Boca — cradle of tango and home of Boca Juniors — with a guide who grew up there.", "dur": "2.5 hours", "inc": ["2.5-hour guided walk with a La Boca local", "Caminito street-art walk", "La Bombonera stadium exterior visit", "Empanada & choripán tasting at a neighbourhood café"], "itin": ["Caminito", "Conventillo painted houses", "La Bombonera stadium", "Neighbourhood café stop"]}, "tr": {"title": "La Boca ve Caminito Sokak Sanatı Turu", "desc": "Tangonun beşiği ve Boca Juniors'ın evi La Boca'nın rengârenk evlerini ve sokak sanatını, mahallede büyümüş bir rehberle keşfedin.", "dur": "2,5 saat", "inc": ["La Boca'lı rehberle 2,5 saatlik yürüyüş", "Caminito sokak sanatı turu", "La Bombonera stadı dış gezisi", "Mahalle kafesinde empanada ve choripán tadımı"], "itin": ["Caminito", "Rengârenk conventillo evleri", "La Bombonera stadyumu", "Mahalle kafesi molası"]}, "ar": {"title": "جولة فن الشوارع في لا بوكا وكامينيتو", "desc": "استكشف المنازل الملونة وفن الشوارع في لا بوكا — مهد التانغو وموطن فريق بوكا جونيورز — مع مرشد نشأ هناك.", "dur": "ساعتان ونصف", "inc": ["جولة مشي مرشدة 2.5 ساعة مع محلي من لا بوكا", "جولة فن الشوارع في كامينيتو", "زيارة خارجية لملعب لا بومبونيرا", "تذوق إمبانادا وتشوريبان في مقهى الحي"], "itin": ["كامينيتو", "منازل كونفينتيو الملونة", "ملعب لا بومبونيرا", "توقف في مقهى الحي"]}, "es": {"title": "Paseo por el Arte Urbano de La Boca y Caminito", "desc": "Explora las casas pintadas y el arte callejero de La Boca — cuna del tango y hogar del Boca Juniors — con un guía que creció allí.", "dur": "2,5 horas", "inc": ["Paseo guiado 2,5 horas con un local de La Boca", "Recorrido de arte urbano por Caminito", "Visita exterior al estadio La Bombonera", "Degustación de empanadas y choripán en café del barrio"], "itin": ["Caminito", "Casas pintadas de conventillo", "Estadio La Bombonera", "Parada en café del barrio"]}}}, {"slug": "abu-dhabi-mangrove-kayaking", "citySlug": "abu-dhabi", "cityName": {"en": "Abu Dhabi", "tr": "Abu Dabi"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 48, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/abu-dhabi-mangrove-kayaking-1.jpg", "assets/images/abu-dhabi-mangrove-kayaking-2.jpg"], "i18n": {"en": {"title": "Mangrove Kayaking in Eastern Mangroves", "desc": "Paddle through a protected mangrove forest minutes from downtown Abu Dhabi, gliding past herons and flamingos with a certified nature guide.", "dur": "2 hours", "inc": ["2-hour guided kayak tour", "Single or double kayak (your choice)", "Full safety equipment including life jacket", "Waterproof bag for your belongings", "Certified nature guide and wildlife commentary"], "itin": ["Safety briefing", "Mangrove channels paddle", "Wildlife spotting", "Return paddle"]}, "tr": {"title": "Doğu Mangrovlarında Kano Turu", "desc": "Şehir merkezine dakikalar uzaklıktaki korunan mangrov ormanında kano yapın; balıkçıllar ve flamingoların arasında sertifikalı doğa rehberiyle süzülün.", "dur": "2 saat", "inc": ["2 saatlik rehberli kano turu", "Tek veya çift kişilik kano (tercihinize göre)", "Can yeleği dahil tam güvenlik ekipmanı", "Eşyalarınız için su geçirmez çanta", "Sertifikalı doğa rehberi ve yaban hayatı anlatımı"], "itin": ["Güvenlik eğitimi", "Mangrov kanallarında kürek", "Yaban hayatı gözlemi", "Dönüş"]}, "ar": {"title": "كياك في غابات المانغروف الشرقية", "desc": "اجذف عبر غابة مانغروف محمية على بعد دقائق من وسط أبوظبي، منزلقاً بجانب طائر أبو قردان والفلامنغو مع مرشد طبيعي معتمد.", "dur": "ساعتان", "inc": ["جولة كياك مرشدة لمدة ساعتين", "كياك فردي أو ثنائي (حسب اختيارك)", "معدات السلامة الكاملة بما يشمل سترة النجاة", "حقيبة مقاومة للماء", "مرشد طبيعي معتمد وتعليق على الحياة البرية"], "itin": ["إحاطة السلامة", "الجذف في قنوات المانغروف", "مراقبة الحياة البرية", "جذف العودة"]}, "es": {"title": "Kayak en los Manglares del Este", "desc": "Rema por un bosque de manglares protegido a minutos del centro de Abu Dabi, junto a garzas y flamencos con un guía naturalista certificado.", "dur": "2 horas", "inc": ["Tour en kayak guiado de 2 horas", "Kayak individual o doble (a tu elección)", "Equipo de seguridad completo con chaleco salvavidas", "Bolsa impermeable para tus pertenencias", "Guía naturalista certificado y comentario sobre fauna"], "itin": ["Instrucciones de seguridad", "Remo por canales de manglares", "Avistamiento de fauna", "Remo de regreso"]}}}, {"slug": "cairo-nile-felucca-sunset", "citySlug": "cairo", "cityName": {"en": "Cairo", "tr": "Kahire"}, "countryName": {"en": "Egypt", "tr": "Mısır"}, "price": 25, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/cairo-nile-felucca-sunset-1.jpg"], "i18n": {"en": {"title": "Nile Felucca Sunset Sailing", "desc": "Drift down the Nile on a traditional felucca as Cairo's skyline lights up — hibiscus juice in hand, dusk on the water.", "dur": "1.5 hours", "inc": ["1.5-hour felucca sail (17:30–19:00)", "Egyptian tea and hibiscus juice (karkadeh)", "Views of Cairo Tower and Zamalek island", "Knowledgeable local boatman"], "itin": ["Garden City dock", "Nile sail", "Cairo Tower & Zamalek views", "Sunset return"]}, "tr": {"title": "Nil'de Feluka ile Gün Batımı Yelkeni", "desc": "Kahire'nin silüeti ışıklanırken geleneksel bir feluka ile Nil'de süzülün — elinizde hibiskus suyu, suda akşamüstü keyfi.", "dur": "1,5 saat", "inc": ["1,5 saatlik feluka turu (17:30–19:00)", "Mısır çayı ve hibiskus suyu (karkade)", "Kahire Kulesi ve Zamalek adası manzarası", "Deneyimli yerel kaptan"], "itin": ["Garden City iskelesi", "Nil'de yelken", "Kahire Kulesi ve Zamalek manzarası", "Gün batımında dönüş"]}, "ar": {"title": "الإبحار بالفلوكة على النيل عند الغروب", "desc": "انسابِ على النيل بفلوكة تقليدية بينما يضيء أفق القاهرة — وفي يدك عصير الكركديه، ومع الغسق على الماء.", "dur": "ساعة ونصف", "inc": ["إبحار بالفلوكة 1.5 ساعة (17:30–19:00)", "شاي مصري وعصير كركديه", "مناظر برج القاهرة وجزيرة الزمالك", "بحّار محلي ذو خبرة"], "itin": ["رصيف غاردن سيتي", "الإبحار على النيل", "مناظر برج القاهرة والزمالك", "العودة عند الغروب"]}, "es": {"title": "Navegación al Atardecer en Feluca por el Nilo", "desc": "Deriva por el Nilo en una feluca tradicional mientras el horizonte de El Cairo se ilumina — con zumo de hibisco en mano al anochecer.", "dur": "1,5 horas", "inc": ["1,5 horas de navegación en feluca (17:30–19:00)", "Té egipcio y zumo de hibisco (karkadeh)", "Vistas de la Torre de El Cairo y la isla de Zamalek", "Barquero local conocedor"], "itin": ["Embarcadero del Garden City", "Navegación por el Nilo", "Vistas de la Torre de El Cairo y Zamalek", "Regreso al atardecer"]}}}, {"slug": "pamukkale-paragliding", "citySlug": "pamukkale", "cityName": {"en": "Pamukkale", "tr": "Pamukkale"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 80, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/pamukkale-paragliding-1.jpg", "assets/images/pamukkale-paragliding-2.jpg"], "i18n": {"en": {"title": "Pamukkale Paragliding over the White Terraces", "desc": "Take a tandem paraglider 1,000 metres above the white terraces and see Pamukkale's cotton castle the way the birds do.", "dur": "2 hours", "inc": ["Professional tandem pilot (certified, 500+ flights)", "Full safety harness and helmet", "GoPro HD footage of your flight", "Certificate of flight", "Hotel transfer to launch site"], "itin": ["Transfer to launch point", "Safety briefing", "Tandem flight over the terraces", "Landing & footage handover"]}, "tr": {"title": "Pamukkale Üzerinde Yamaç Paraşütü", "desc": "Tandem yamaç paraşütüyle 1.000 metreye yükselin ve pamuk kalesini kuşların gözünden izleyin.", "dur": "2 saat", "inc": ["Profesyonel tandem pilot (sertifikalı, 500+ uçuş)", "Tam emniyet kemeri ve kask", "Uçuşunuzun GoPro HD kaydı", "Uçuş sertifikası", "Kalkış noktasına otel transferi"], "itin": ["Kalkış noktasına transfer", "Güvenlik bilgilendirmesi", "Travertenler üzerinde tandem uçuş", "İniş ve görüntü teslimi"]}, "ar": {"title": "باراغلايدينغ فوق التراسات البيضاء لباموكالي", "desc": "حلّق على متن باراغلايدر ثنائي على ارتفاع 1000 متر فوق التراسات البيضاء ورَ قلعة القطن في باموكالي كما تراها الطيور.", "dur": "ساعتان", "inc": ["طيار تاندم محترف (معتمد، أكثر من 500 رحلة)", "تسخير أمان كامل وخوذة", "تسجيل فيديو HD بـ GoPro", "شهادة طيران", "نقل من الفندق إلى نقطة الانطلاق"], "itin": ["النقل إلى نقطة الانطلاق", "إحاطة السلامة", "رحلة تاندم فوق التراسات", "الهبوط وتسليم التسجيل"]}, "es": {"title": "Parapente sobre las Terrazas Blancas de Pamukkale", "desc": "Vuela en parapente tándem a 1.000 metros sobre las terrazas blancas y ve el castillo de algodón de Pamukkale como lo ven los pájaros.", "dur": "2 horas", "inc": ["Piloto tándem profesional (certificado, +500 vuelos)", "Arnés de seguridad completo y casco", "Video HD GoPro de tu vuelo", "Certificado de vuelo", "Traslado desde el hotel al punto de despegue"], "itin": ["Traslado al punto de despegue", "Instrucciones de seguridad", "Vuelo tándem sobre las terrazas", "Aterrizaje y entrega del video"]}}}, {"slug": "fethiye-paragliding-babadag", "citySlug": "fethiye", "cityName": {"en": "Fethiye", "tr": "Fethiye"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 95, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/fethiye-paragliding-babadag-1.jpg", "assets/images/fethiye-paragliding-babadag-2.jpg"], "i18n": {"en": {"title": "Paragliding from Babadağ Mountain", "desc": "Launch from 1,969-metre Babadağ and glide down to Ölüdeniz beach — one of the world's top paragliding sites, captured on HD video.", "dur": "2.5 hours", "inc": ["Tandem flight with BHPA/SHV certified pilot", "25–45 minute flight time (conditions dependent)", "HD GoPro video and photos", "Land directly on Ölüdeniz beach", "Transfer back to launch site"], "itin": ["Babadağ summit transfer", "Take-off at 1,969 m", "Flight over the Blue Lagoon", "Beach landing"]}, "tr": {"title": "Babadağ'dan Yamaç Paraşütü", "desc": "1.969 metrelik Babadağ'dan havalanın ve dünyanın en iyi yamaç paraşütü noktalarından biri olan Ölüdeniz plajına süzülerek inin — HD video kaydıyla.", "dur": "2,5 saat", "inc": ["BHPA/SHV sertifikalı pilotla tandem uçuş", "25–45 dakika uçuş süresi (hava koşullarına bağlı)", "HD GoPro video ve fotoğraflar", "Doğrudan Ölüdeniz plajına iniş", "Kalkış noktasına dönüş transferi"], "itin": ["Babadağ zirvesine transfer", "1.969 metreden kalkış", "Mavi Lagün üzerinde uçuş", "Plaja iniş"]}, "ar": {"title": "باراغلايدينغ من جبل بابا داغ", "desc": "انطلق من بابا داغ على ارتفاع 1969 متراً وانزلق إلى شاطئ أولودينيز — أحد أفضل مواقع الباراغلايدينغ في العالم، مسجّلاً بفيديو HD.", "dur": "ساعتان ونصف", "inc": ["رحلة ثنائية مع طيار معتمد BHPA/SHV", "25–45 دقيقة طيران (حسب الظروف)", "فيديو وصور HD بـ GoPro", "هبوط مباشر على شاطئ أولودينيز", "النقل إلى نقطة الانطلاق"], "itin": ["النقل إلى قمة بابا داغ", "الانطلاق من 1969 م", "الطيران فوق البحيرة الزرقاء", "الهبوط على الشاطئ"]}, "es": {"title": "Parapente desde la Montaña Babadağ", "desc": "Despega desde Babadağ a 1.969 metros y planea hasta la playa de Ölüdeniz — uno de los mejores sitios de parapente del mundo, en video HD.", "dur": "2,5 horas", "inc": ["Vuelo tándem con piloto certificado BHPA/SHV", "25–45 minutos de vuelo (según condiciones)", "Video HD GoPro y fotos", "Aterrizaje directo en la playa de Ölüdeniz", "Traslado de regreso al punto de despegue"], "itin": ["Traslado a la cima de Babadağ", "Despegue a 1.969 m", "Vuelo sobre la Laguna Azul", "Aterrizaje en la playa"]}}}, {"slug": "cairo-pyramids-sphinx-tour", "citySlug": "cairo", "cityName": {"en": "Cairo", "tr": "Kahire"}, "countryName": {"en": "Egypt", "tr": "Mısır"}, "price": 75, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/cairo-pyramids-sphinx-tour-1.jpg", "assets/images/cairo-pyramids-sphinx-tour-2.jpg", "assets/images/cairo-pyramids-sphinx-tour-3.jpg"], "i18n": {"en": {"title": "Pyramids of Giza & Great Sphinx Full-Day Tour", "desc": "Stand before the last surviving Wonder of the Ancient World with your own Egyptologist, from the Great Pyramid to the gaze of the Sphinx.", "dur": "Full day", "inc": ["Return hotel transfer from Cairo or Giza", "Licensed Egyptologist guide (English)", "Pyramid complex entry ticket", "Sphinx viewpoint access", "Lunch at a Nile-view restaurant", "Optional camel ride (paid on site)"], "itin": ["Great Pyramid of Khufu", "Panoramic plateau viewpoint", "Great Sphinx", "Valley Temple", "Nile-view lunch"]}, "tr": {"title": "Giza Piramitleri ve Büyük Sfenks Tam Gün Turu", "desc": "Kendi Mısırbilimci rehberinizle Antik Dünya'nın ayakta kalan son harikasının önünde durun; Büyük Piramit'ten Sfenks'in bakışına uzanan tam gün tur.", "dur": "Tam gün", "inc": ["Kahire veya Giza otellerinden gidiş-dönüş transfer", "Lisanslı Mısırbilimci rehber (İngilizce)", "Piramitler ören yeri giriş bileti", "Sfenks seyir noktası", "Nil manzaralı restoranda öğle yemeği", "Opsiyonel deve binişi (yerinde ödenir)"], "itin": ["Keops Piramidi", "Panoramik plato seyir noktası", "Büyük Sfenks", "Vadi Tapınağı", "Nil manzaralı öğle yemeği"]}, "ar": {"title": "جولة يوم كامل إلى أهرامات الجيزة وأبو الهول", "desc": "قف أمام آخر عجائب العالم القديم الباقية مع عالم آثار خاص بك، من الهرم الأكبر إلى نظرة أبو الهول.", "dur": "يوم كامل", "inc": ["نقل ذهاباً وإياباً من فندق في القاهرة أو الجيزة", "مرشد مصريات مرخص (إنجليزي)", "تذكرة دخول مجمع الأهرامات", "الوصول إلى نقطة مشاهدة أبو الهول", "غداء في مطعم مطل على النيل", "ركوب جمل اختياري (يُدفع في الموقع)"], "itin": ["هرم خوفو الأكبر", "نقطة مشاهدة بانورامية", "أبو الهول الكبير", "معبد الوادي", "غداء مطل على النيل"]}, "es": {"title": "Tour de Día Completo a las Pirámides de Giza y la Gran Esfinge", "desc": "Párate frente a la última Maravilla del Mundo Antiguo con tu propio egiptólogo, desde la Gran Pirámide hasta la mirada de la Esfinge.", "dur": "Día completo", "inc": ["Traslado ida y vuelta desde hotel en El Cairo o Giza", "Guía egiptólogo con licencia (inglés)", "Entrada al complejo de pirámides", "Acceso al mirador de la Esfinge", "Almuerzo en restaurante con vistas al Nilo", "Paseo en camello opcional (pago en el lugar)"], "itin": ["Gran Pirámide de Keops", "Mirador panorámico de la meseta", "Gran Esfinge", "Templo del Valle", "Almuerzo con vistas al Nilo"]}}}, {"slug": "buenos-aires-recoleta-cemetery-tour", "citySlug": "buenos-aires", "cityName": {"en": "Buenos Aires", "tr": "Buenos Aires"}, "countryName": {"en": "Argentina", "tr": "Arjantin"}, "price": 25, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/buenos-aires-recoleta-cemetery-tour-1.jpg"], "i18n": {"en": {"title": "Recoleta Cemetery & Belle Époque Neighbourhood Tour", "desc": "Walk the marble avenues of Recoleta Cemetery — resting place of Eva Perón — then explore the city's most elegant Belle Époque quarter.", "dur": "2.5 hours", "inc": ["Guided cemetery tour (1 hour)", "Recoleta neighbourhood walking tour (45 minutes)", "MALBA entrance and courtyard visit", "Coffee and medialunas at a traditional confitería"], "itin": ["Recoleta Cemetery & Eva Perón's tomb", "Basilica del Pilar", "Belle Époque mansions", "Café stop"]}, "tr": {"title": "Recoleta Mezarlığı ve Belle Époque Semti Turu", "desc": "Eva Perón'un da yattığı Recoleta Mezarlığı'nın mermer caddelerinde yürüyün, ardından şehrin en zarif Belle Époque semtini keşfedin.", "dur": "2,5 saat", "inc": ["Rehberli mezarlık turu (1 saat)", "Recoleta semti yürüyüşü (45 dakika)", "MALBA girişi ve avlu ziyareti", "Geleneksel pastanede kahve ve medialunas"], "itin": ["Recoleta Mezarlığı ve Eva Perón'un mezarı", "Pilar Bazilikası", "Belle Époque konakları", "Kafe molası"]}, "ar": {"title": "جولة في مقبرة ريكوليتا وحي بيل إيبوك", "desc": "امشِ في شوارع مقبرة ريكوليتا الرخامية — مثوى إيفا بيرون — ثم استكشف أرقى حي بيل إيبوك في المدينة.", "dur": "ساعتان ونصف", "inc": ["جولة مرشدة في المقبرة (ساعة واحدة)", "جولة مشي في حي ريكوليتا (45 دقيقة)", "زيارة مالبا والفناء الداخلي", "قهوة وميدياليناس في مقهى تقليدي"], "itin": ["مقبرة ريكوليتا وقبر إيفا بيرون", "بازيليكا بيلار", "قصور بيل إيبوك", "توقف في مقهى"]}, "es": {"title": "Cementerio de Recoleta y Tour por el Barrio Belle Époque", "desc": "Recorre las avenidas de mármol del Cementerio de Recoleta — lugar de descanso de Eva Perón — y explora el elegante barrio Belle Époque.", "dur": "2,5 horas", "inc": ["Tour guiado por el cementerio (1 hora)", "Paseo a pie por el barrio de Recoleta (45 minutos)", "Visita a MALBA y su patio", "Café y medialunas en confitería tradicional"], "itin": ["Cementerio de Recoleta y tumba de Eva Perón", "Basílica del Pilar", "Mansiones Belle Époque", "Parada en café"]}}}, {"slug": "fethiye-saklikent-gorge", "citySlug": "fethiye", "cityName": {"en": "Fethiye", "tr": "Fethiye"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 32, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/fethiye-saklikent-gorge-1.jpg", "assets/images/fethiye-saklikent-gorge-2.jpg"], "i18n": {"en": {"title": "Saklıkent Gorge Trekking & River Walk", "desc": "Wade through the ice-cold glacial stream of one of Europe's deepest gorges, then refuel with lunch on a riverside platform.", "dur": "6 hours", "inc": ["Transport from Fethiye", "Gorge entry fee", "Waterproof dry bag", "River shoes (sizes 36–46)", "Lunch at a riverside platform restaurant"], "itin": ["Fethiye departure", "Gorge boardwalk", "River trekking", "Riverside lunch", "Return"]}, "tr": {"title": "Saklıkent Kanyonu Yürüyüşü ve Nehir Geçişi", "desc": "Avrupa'nın en derin kanyonlarından birinde buz gibi suların içinde yürüyün, ardından nehir kenarındaki platformda öğle yemeğinin keyfini çıkarın.", "dur": "6 saat", "inc": ["Fethiye'den ulaşım", "Kanyon giriş ücreti", "Su geçirmez çanta", "Nehir ayakkabısı (36–46 numara)", "Nehir kenarında öğle yemeği"], "itin": ["Fethiye'den hareket", "Kanyon yürüyüş platformu", "Nehir yürüyüşü", "Öğle yemeği", "Dönüş"]}, "ar": {"title": "تريكينغ ومسير نهري في وادي ساكليكنت", "desc": "اخض مياه الجليد المتجمدة في أحد أعمق الأودية في أوروبا، ثم أعد طاقتك بغداء على منصة بالقرب من النهر.", "dur": "6 ساعات", "inc": ["نقل من فتحية", "رسوم دخول الوادي", "حقيبة مقاومة للماء", "أحذية نهرية (مقاسات 36–46)", "غداء في مطعم على منصة بجانب النهر"], "itin": ["المغادرة من فتحية", "ممشى الوادي", "التريكينغ النهري", "الغداء بجانب النهر", "العودة"]}, "es": {"title": "Trekking y Paseo Fluvial por las Gargantas de Saklıkent", "desc": "Vadea el helado arroyo glaciar de uno de los desfiladeros más profundos de Europa, luego almuerza en una plataforma a orillas del río.", "dur": "6 horas", "inc": ["Transporte desde Fethiye", "Entrada al desfiladero", "Bolsa impermeable seca", "Calzado para el río (tallas 36–46)", "Almuerzo en restaurante de plataforma fluvial"], "itin": ["Salida desde Fethiye", "Pasarela del desfiladero", "Trekking por el río", "Almuerzo junto al río", "Regreso"]}}}, {"slug": "abu-dhabi-sheikh-zayed-mosque", "citySlug": "abu-dhabi", "cityName": {"en": "Abu Dhabi", "tr": "Abu Dabi"}, "countryName": {"en": "United Arab Emirates", "tr": "Birleşik Arap Emirlikleri"}, "price": 35, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/abu-dhabi-sheikh-zayed-mosque-1.jpg", "assets/images/abu-dhabi-sheikh-zayed-mosque-2.jpg"], "i18n": {"en": {"title": "Sheikh Zayed Grand Mosque Tour", "desc": "Tour one of the world's largest mosques — white marble, gold leaf and the biggest hand-knotted carpet ever made — with an expert guide.", "dur": "3 hours", "inc": ["Expert guided tour (90 minutes)", "Modest dress provided at entrance if required", "Islamic art, calligraphy and architecture commentary", "Return hotel transfer from Abu Dhabi hotels"], "itin": ["Main courtyard (Sahan)", "Prayer hall & hand-knotted carpet", "Reflective pools", "Photo stops"]}, "tr": {"title": "Şeyh Zayed Ulu Camii Turu", "desc": "Beyaz mermeri, altın varakları ve dünyanın en büyük el dokuması halısıyla dünyanın en büyük camilerinden birini uzman rehber eşliğinde gezin.", "dur": "3 saat", "inc": ["Uzman rehberli tur (90 dakika)", "Gerekirse girişte uygun kıyafet temini", "İslam sanatı, hat ve mimari anlatımı", "Abu Dabi otellerine gidiş-dönüş transfer"], "itin": ["Ana avlu", "İbadet salonu ve el dokuması halı", "Yansıma havuzları", "Fotoğraf molaları"]}, "ar": {"title": "جولة في جامع الشيخ زايد الكبير", "desc": "جوّل في أحد أكبر مساجد العالم — رخام أبيض وورق ذهبي وأكبر سجادة مربوطة يدوياً — مع مرشد خبير.", "dur": "3 ساعات", "inc": ["جولة مرشدة خبيرة (90 دقيقة)", "تزويد بالملابس المناسبة عند المدخل إذا لزم", "شرح على الفن الإسلامي والخط والعمارة", "نقل من فنادق أبوظبي"], "itin": ["الفناء الرئيسي (الصحن)", "قاعة الصلاة والسجادة المربوطة يدوياً", "أحواض الانعكاس", "توقفات تصوير"]}, "es": {"title": "Tour por la Gran Mezquita Sheikh Zayed", "desc": "Visita una de las mezquitas más grandes del mundo — mármol blanco, pan de oro y la alfombra anudada a mano más grande jamás hecha — con un guía experto.", "dur": "3 horas", "inc": ["Tour guiado experto (90 minutos)", "Vestimenta modesta en la entrada si es necesario", "Comentario sobre arte islámico, caligrafía y arquitectura", "Traslado desde hoteles de Abu Dabi"], "itin": ["Patio principal (Sahan)", "Sala de oración y alfombra anudada a mano", "Piscinas reflectantes", "Paradas para fotos"]}}}, {"slug": "buenos-aires-tango-show-dinner", "citySlug": "buenos-aires", "cityName": {"en": "Buenos Aires", "tr": "Buenos Aires"}, "countryName": {"en": "Argentina", "tr": "Arjantin"}, "price": 95, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/buenos-aires-tango-show-dinner-1.jpg", "assets/images/buenos-aires-tango-show-dinner-2.jpg"], "i18n": {"en": {"title": "Tango Show & Dinner in San Telmo", "desc": "An evening of world-class tango in a historic San Telmo milonga, paired with a four-course Argentine dinner and fine local wines.", "dur": "4 hours (evening)", "inc": ["VIP seating at a historic San Telmo milonga", "Four-course dinner with Argentine wines", "90-minute professional tango show (four acts)", "Introduction to tango history by your host", "Optional beginner tango lesson (30 min)"], "itin": ["Welcome drink", "Optional tango lesson", "Dinner service", "Four-act tango show"]}, "tr": {"title": "San Telmo'da Tango Gösterisi ve Akşam Yemeği", "desc": "Tarihi bir San Telmo milongasında dünya standartlarında tango; dört çeşit Arjantin yemeği ve seçkin yerel şaraplar eşliğinde bir akşam.", "dur": "4 saat (akşam)", "inc": ["Tarihi milongada VIP oturma", "Arjantin şaraplarıyla dört çeşit akşam yemeği", "90 dakikalık profesyonel tango gösterisi (dört perde)", "Ev sahibinden tango tarihi sunumu", "Opsiyonel başlangıç tango dersi (30 dk)"], "itin": ["Karşılama içeceği", "Opsiyonel tango dersi", "Akşam yemeği servisi", "Dört perdelik tango gösterisi"]}, "ar": {"title": "عرض التانغو والعشاء في سان تيلمو", "desc": "أمسية من التانغو الراقي في ميلونغا تاريخية في سان تيلمو، مصحوبة بعشاء أرجنتيني من أربعة أطباق ونبيذ محلي فاخر.", "dur": "4 ساعات (مسائي)", "inc": ["مقاعد VIP في ميلونغا تاريخية في سان تيلمو", "عشاء أربعة أطباق مع نبيذ أرجنتيني", "عرض تانغو احترافي لمدة 90 دقيقة (أربعة فصول)", "مقدمة عن تاريخ التانغو بواسطة المضيف", "درس تانغو اختياري للمبتدئين (30 دقيقة)"], "itin": ["مشروب الترحيب", "درس تانغو اختياري", "خدمة العشاء", "عرض التانغو في أربعة فصول"]}, "es": {"title": "Espectáculo de Tango y Cena en San Telmo", "desc": "Una noche de tango de clase mundial en una histórica milonga de San Telmo, con cena argentina de cuatro platos y excelentes vinos locales.", "dur": "4 horas (noche)", "inc": ["Asiento VIP en milonga histórica de San Telmo", "Cena de cuatro platos con vinos argentinos", "Espectáculo de tango profesional de 90 minutos (cuatro actos)", "Introducción a la historia del tango por el anfitrión", "Lección de tango para principiantes opcional (30 min)"], "itin": ["Bebida de bienvenida", "Lección de tango opcional", "Servicio de cena", "Espectáculo de tango en cuatro actos"]}}}, {"slug": "london-thames-river-cruise-greenwich", "citySlug": "london", "cityName": {"en": "London", "tr": "Londra"}, "countryName": {"en": "England", "tr": "İngiltere"}, "price": 28, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/london-thames-river-cruise-greenwich-1.jpg", "assets/images/london-thames-river-cruise-greenwich-3.jpg"], "i18n": {"en": {"title": "Thames River Cruise: Westminster to Greenwich", "desc": "Cruise past Parliament, the Shard and Tower Bridge to Greenwich — then stand astride the Prime Meridian and board the Cutty Sark.", "dur": "5 hours", "inc": ["Hop-on hop-off Thames Clipper pass (Westminster–Greenwich)", "Live or audio commentary on board", "Royal Observatory Greenwich entry", "Cutty Sark admission"], "itin": ["Westminster Pier", "Tower Bridge", "Canary Wharf", "Greenwich: Royal Observatory & Cutty Sark"]}, "tr": {"title": "Thames Nehri Turu: Westminster'dan Greenwich'e", "desc": "Parlamento, The Shard ve Tower Bridge'in önünden geçerek Greenwich'e ulaşın; sıfır meridyeninin üzerinde durun ve Cutty Sark'ı gezin.", "dur": "5 saat", "inc": ["Thames Clipper serbest biniş kartı (Westminster–Greenwich)", "Teknede canlı veya sesli anlatım", "Kraliyet Gözlemevi (Greenwich) girişi", "Cutty Sark girişi"], "itin": ["Westminster İskelesi", "Tower Bridge", "Canary Wharf", "Greenwich: Kraliyet Gözlemevi ve Cutty Sark"]}, "ar": {"title": "رحلة على نهر التيمز: من ويستمنستر إلى غرينتش", "desc": "أبحر بجانب البرلمان وذا شارد وجسر البرج إلى غرينتش — ثم قف عند خط الزوال الأول واعل متحف كاتي سارك.", "dur": "5 ساعات", "inc": ["تذكرة Thames Clipper هوب أون هوب أوف (ويستمنستر–غرينتش)", "تعليق حي أو صوتي على متن السفينة", "دخول المرصد الملكي في غرينتش", "دخول متحف كاتي سارك"], "itin": ["رصيف ويستمنستر", "جسر البرج", "كناري وارف", "غرينتش: المرصد الملكي وكاتي سارك"]}, "es": {"title": "Crucero por el Támesis: de Westminster a Greenwich", "desc": "Navega junto al Parlamento, The Shard y el Tower Bridge hasta Greenwich — luego párate sobre el Meridiano Principal y visita el Cutty Sark.", "dur": "5 horas", "inc": ["Pase Thames Clipper hop-on hop-off (Westminster–Greenwich)", "Comentario en vivo o audioguía a bordo", "Entrada al Observatorio Real de Greenwich", "Admisión al Cutty Sark"], "itin": ["Embarcadero de Westminster", "Tower Bridge", "Canary Wharf", "Greenwich: Observatorio Real y Cutty Sark"]}}}, {"slug": "istanbul-topkapi-grand-bazaar-tour", "citySlug": "istanbul", "cityName": {"en": "Istanbul", "tr": "İstanbul"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 38, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/istanbul-topkapi-grand-bazaar-tour-1.jpg"], "i18n": {"en": {"title": "Topkapı Palace & Grand Bazaar Walking Tour", "desc": "Walk through 600 years of Ottoman power at Topkapı Palace, then lose yourself among the 4,000 shops of the Grand Bazaar.", "dur": "4.5 hours", "inc": ["Skip-the-line palace entry ticket", "Expert licensed guide (English)", "Grand Bazaar orientation map", "Traditional Turkish breakfast at a Sultanahmet café"], "itin": ["Sultanahmet breakfast", "Topkapı Palace courtyards & treasury", "Grand Bazaar guided walk", "Free time for shopping"]}, "tr": {"title": "Topkapı Sarayı ve Kapalıçarşı Yürüyüş Turu", "desc": "Topkapı Sarayı'nda 600 yıllık Osmanlı tarihinde yürüyün, ardından Kapalıçarşı'nın 4.000 dükkânı arasında kaybolun.", "dur": "4,5 saat", "inc": ["Sırasız saray giriş bileti", "Uzman lisanslı rehber", "Kapalıçarşı yönlendirme haritası", "Sultanahmet'te geleneksel Türk kahvaltısı"], "itin": ["Sultanahmet'te kahvaltı", "Topkapı Sarayı avluları ve hazine", "Kapalıçarşı rehberli turu", "Alışveriş için serbest zaman"]}, "ar": {"title": "جولة مشي في قصر توبكابي والبازار الكبير", "desc": "تجوّل في 600 عام من القوة العثمانية في قصر توبكابي، ثم اضيع بين 4000 دكان في البازار الكبير.", "dur": "4.5 ساعات", "inc": ["تذكرة دخول القصر دون طابور", "مرشد خبير مرخص (إنجليزي)", "خريطة إرشادية للبازار الكبير", "فطور تركي تقليدي في مقهى السلطان أحمد"], "itin": ["الفطور في السلطان أحمد", "فناء وكنز قصر توبكابي", "جولة مرشدة في البازار الكبير", "وقت حر للتسوق"]}, "es": {"title": "Tour a Pie por el Palacio de Topkapı y el Gran Bazar", "desc": "Recorre 600 años de poder otomano en el Palacio de Topkapı, luego piérdete entre las 4.000 tiendas del Gran Bazar.", "dur": "4,5 horas", "inc": ["Entrada al palacio sin colas", "Guía experto con licencia (inglés)", "Mapa de orientación del Gran Bazar", "Desayuno turco tradicional en café de Sultanahmet"], "itin": ["Desayuno en Sultanahmet", "Patios y tesoro del Palacio de Topkapı", "Recorrido guiado por el Gran Bazar", "Tiempo libre de compras"]}}}, {"slug": "london-tower-crown-jewels-tour", "citySlug": "london", "cityName": {"en": "London", "tr": "Londra"}, "countryName": {"en": "England", "tr": "İngiltere"}, "price": 42, "freeCancellation": true, "hotelPickup": false, "images": ["assets/images/london-tower-crown-jewels-tour-1.jpg", "assets/images/london-tower-crown-jewels-tour-2.jpg"], "i18n": {"en": {"title": "Tower of London & Crown Jewels Tour", "desc": "A Yeoman Warder leads you through a thousand years of royal history — crown jewels, medieval armour and tales from Tower Green.", "dur": "3 hours", "inc": ["Skip-the-line Tower of London entry ticket", "Guided tour by a Yeoman Warder (45 minutes)", "Crown Jewels gallery viewing", "White Tower medieval armour exhibition", "Tower Green historical site visit"], "itin": ["Tower entrance", "Yeoman Warder tour", "Crown Jewels", "White Tower", "Ravens & ramparts"]}, "tr": {"title": "Londra Kulesi ve Kraliyet Mücevherleri Turu", "desc": "Bir Yeoman Warder eşliğinde bin yıllık kraliyet tarihine yolculuk: taç mücevherleri, ortaçağ zırhları ve Tower Green'in hikâyeleri.", "dur": "3 saat", "inc": ["Sırasız Londra Kulesi giriş bileti", "Yeoman Warder rehberli tur (45 dakika)", "Kraliyet Mücevherleri galerisi", "White Tower ortaçağ zırh sergisi", "Tower Green ziyareti"], "itin": ["Kule girişi", "Yeoman Warder turu", "Kraliyet Mücevherleri", "White Tower", "Kuzgunlar ve surlar"]}, "ar": {"title": "برج لندن وجولة جواهر التاج", "desc": "يرشدك أحد حراس يومان وردر عبر ألف عام من التاريخ الملكي — جواهر التاج والدروع الوسطى وحكايات تاور غرين.", "dur": "3 ساعات", "inc": ["تذكرة دخول برج لندن دون طابور", "جولة مرشدة بواسطة يومان وردر (45 دقيقة)", "مشاهدة معرض جواهر التاج", "معرض دروع العصور الوسطى في البرج الأبيض", "زيارة الموقع التاريخي لتاور غرين"], "itin": ["مدخل البرج", "جولة مع يومان وردر", "جواهر التاج", "البرج الأبيض", "الغربان والأسوار"]}, "es": {"title": "Torre de Londres y Tour de las Joyas de la Corona", "desc": "Un Yeoman Warder te guía por mil años de historia real — joyas de la corona, armaduras medievales e historias del Tower Green.", "dur": "3 horas", "inc": ["Entrada a la Torre de Londres sin colas", "Tour guiado por un Yeoman Warder (45 minutos)", "Visita a la galería de las Joyas de la Corona", "Exposición de armaduras medievales de la Torre Blanca", "Visita al lugar histórico de Tower Green"], "itin": ["Entrada a la Torre", "Tour con el Yeoman Warder", "Joyas de la Corona", "Torre Blanca", "Cuervos y murallas"]}}}, {"slug": "istanbul-cooking-class", "citySlug": "istanbul", "cityName": {"en": "Istanbul", "tr": "İstanbul"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 65, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/istanbul-cooking-class-1.jpg", "assets/images/istanbul-cooking-class-2.jpg", "assets/images/istanbul-cooking-class-3.jpg"], "i18n": {"en": {"title": "Turkish Cooking Class with a Local Family", "desc": "Cook meze, börek and baklava in a family home in Beyoğlu, then sit down to the feast you made — raki toast included.", "dur": "4 hours", "inc": ["All fresh ingredients", "Printed recipe booklet to take home", "Full meal with everything you've cooked", "Turkish tea, ayran and a glass of raki"], "itin": ["Welcome & menu intro", "Meze & börek workshop", "Baklava session", "Shared dinner at the family table"]}, "tr": {"title": "Yerel Bir Aileyle Türk Yemekleri Atölyesi", "desc": "Beyoğlu'nda bir aile evinde meze, börek ve baklava hazırlayın; ardından kendi elinizle kurduğunuz sofraya oturun — rakı eşliğinde.", "dur": "4 saat", "inc": ["Tüm taze malzemeler", "Eve götürmek için basılı tarif kitapçığı", "Pişirdiklerinizden oluşan tam bir sofra", "Türk çayı, ayran ve bir kadeh rakı"], "itin": ["Karşılama ve menü tanıtımı", "Meze ve börek atölyesi", "Baklava yapımı", "Aile sofrasında akşam yemeği"]}, "ar": {"title": "درس طبخ تركي مع عائلة محلية", "desc": "اطهُ المزة والبوريك والبقلاوة في منزل عائلي في بيوغلو، ثم اجلس إلى المائدة التي أعددتها — مع نخب الراقي.", "dur": "4 ساعات", "inc": ["جميع المكونات الطازجة", "كتيب وصفات مطبوع تأخذه معك", "وجبة كاملة من كل ما طهوته", "شاي تركي وأيران وكأس من الراقي"], "itin": ["الترحيب وتقديم القائمة", "ورشة المزة والبوريك", "جلسة البقلاوة", "عشاء مشترك على طاولة العائلة"]}, "es": {"title": "Clase de Cocina Turca con una Familia Local", "desc": "Cocina meze, börek y baklava en una casa familiar en Beyoğlu, luego siéntate al banquete que preparaste — brindis con rakı incluido.", "dur": "4 horas", "inc": ["Todos los ingredientes frescos", "Recetario impreso para llevarte a casa", "Comida completa con todo lo que hayas cocinado", "Té turco, ayran y una copa de rakı"], "itin": ["Bienvenida e introducción al menú", "Taller de meze y börek", "Sesión de baklava", "Cena compartida en la mesa familiar"]}}}, {"slug": "capadoccia-derinkuyu-underground-city", "citySlug": "cappadocia", "cityName": {"en": "Cappadocia", "tr": "Kapadokya"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 42, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/capadoccia-derinkuyu-underground-city-1.jpg", "assets/images/capadoccia-derinkuyu-underground-city-2.jpg"], "i18n": {"en": {"title": "Underground City of Derinkuyu Tour", "desc": "Descend 18 storeys into an ancient underground city that once sheltered 20,000 people, with an archaeologist as your guide.", "dur": "4 hours", "inc": ["Entry tickets to Derinkuyu Underground City", "Expert archaeologist guide (English)", "Transport from Göreme town centre", "Visit to nearby Kaymaklı Underground City"], "itin": ["Göreme departure", "Derinkuyu descent", "Ventilation shafts, stables & chapel", "Kaymaklı visit", "Return"]}, "tr": {"title": "Derinkuyu Yeraltı Şehri Turu", "desc": "Bir zamanlar 20.000 kişiyi barındıran antik yeraltı şehrinin 18 kat derinliğine, arkeolog rehber eşliğinde inin.", "dur": "4 saat", "inc": ["Derinkuyu Yeraltı Şehri giriş biletleri", "Uzman arkeolog rehber", "Göreme merkezinden ulaşım", "Kaymaklı Yeraltı Şehri ziyareti"], "itin": ["Göreme'den hareket", "Derinkuyu'ya iniş", "Havalandırma bacaları, ahırlar ve şapel", "Kaymaklı ziyareti", "Dönüş"]}, "ar": {"title": "جولة في مدينة درينكويو تحت الأرض", "desc": "انزل 18 طابقاً إلى مدينة قديمة تحت الأرض كانت تؤوي 20000 شخص يوماً ما، مع عالم آثار مرشداً لك.", "dur": "4 ساعات", "inc": ["تذاكر دخول مدينة درينكويو تحت الأرض", "مرشد عالم آثار خبير (إنجليزي)", "نقل من مركز غوريمي", "زيارة مدينة قايماكلي تحت الأرض"], "itin": ["المغادرة من غوريمي", "النزول في درينكويو", "مجاري التهوية والاسطبلات والكنيسة", "زيارة قايماكلي", "العودة"]}, "es": {"title": "Tour a la Ciudad Subterránea de Derinkuyu", "desc": "Desciende 18 plantas a una ciudad subterránea antigua que albergó a 20.000 personas, con un arqueólogo como guía.", "dur": "4 horas", "inc": ["Entradas a la Ciudad Subterránea de Derinkuyu", "Guía arqueólogo experto (inglés)", "Transporte desde el centro de Göreme", "Visita a la Ciudad Subterránea de Kaymaklı"], "itin": ["Salida desde Göreme", "Descenso a Derinkuyu", "Pozos de ventilación, establos y capilla", "Visita a Kaymaklı", "Regreso"]}}}, {"slug": "fethiye-oludeniz-boat-trip", "citySlug": "fethiye", "cityName": {"en": "Fethiye", "tr": "Fethiye"}, "countryName": {"en": "Turkey", "tr": "Türkiye"}, "price": 40, "freeCancellation": true, "hotelPickup": true, "images": ["assets/images/fethiye-oludeniz-boat-trip-1.jpg", "assets/images/fethiye-oludeniz-boat-trip-2.jpg"], "i18n": {"en": {"title": "Ölüdeniz Blue Lagoon Boat Trip", "desc": "A full day on the water around the world-famous Blue Lagoon: snorkelling stops, Butterfly Valley and lunch grilled on board.", "dur": "Full day", "inc": ["Full-day boat trip 10:00–17:00", "Lunch on board (salad, grilled chicken, fruit)", "Snorkelling equipment", "Butterfly Valley stop (30 min ashore)", "St Nicholas Island ruins stop"], "itin": ["Ölüdeniz departure", "Blue Lagoon swim", "Butterfly Valley", "St Nicholas Island", "Return"]}, "tr": {"title": "Ölüdeniz Mavi Lagün Tekne Turu", "desc": "Dünyaca ünlü Mavi Lagün çevresinde tam gün deniz keyfi: şnorkel molaları, Kelebekler Vadisi ve teknede ızgara öğle yemeği.", "dur": "Tam gün", "inc": ["Tam gün tekne turu (10:00–17:00)", "Teknede öğle yemeği (salata, ızgara tavuk, meyve)", "Şnorkel ekipmanı", "Kelebekler Vadisi molası (karada 30 dk)", "Aziz Nikolaos Adası kalıntıları molası"], "itin": ["Ölüdeniz'den kalkış", "Mavi Lagün'de yüzme", "Kelebekler Vadisi", "Aziz Nikolaos Adası", "Dönüş"]}, "ar": {"title": "رحلة قارب في البحيرة الزرقاء لأولودينيز", "desc": "يوم كامل على المياه حول البحيرة الزرقاء الشهيرة عالمياً: توقفات الغطس، وادي الفراشات وغداء مشوي على متن القارب.", "dur": "يوم كامل", "inc": ["رحلة قارب يوم كامل 10:00–17:00", "الغداء على متن القارب (سلطة، دجاج مشوي، فاكهة)", "معدات الغطس", "توقف في وادي الفراشات (30 دقيقة على الأرض)", "توقف عند أطلال جزيرة القديس نيقولاوس"], "itin": ["المغادرة من أولودينيز", "السباحة في البحيرة الزرقاء", "وادي الفراشات", "جزيرة القديس نيقولاوس", "العودة"]}, "es": {"title": "Excursión en Barca por la Laguna Azul de Ölüdeniz", "desc": "Un día completo en el agua alrededor de la mundialmente famosa Laguna Azul: snorkel, el Valle de las Mariposas y almuerzo a la brasa a bordo.", "dur": "Día completo", "inc": ["Excursión en barca día completo 10:00–17:00", "Almuerzo a bordo (ensalada, pollo a la brasa, fruta)", "Equipo de snorkel", "Parada en el Valle de las Mariposas (30 min en tierra)", "Parada en ruinas de la Isla de San Nicolás"], "itin": ["Salida desde Ölüdeniz", "Baño en la Laguna Azul", "Valle de las Mariposas", "Isla de San Nicolás", "Regreso"]}}}];
/* ---------- Admin overrides (from localStorage) ---------- */
(function() {
  try {
    const ov = JSON.parse(localStorage.getItem("mv-config") || "{}");
    Object.assign(CONFIG, ov);
    const at = JSON.parse(localStorage.getItem("mv-admin-tours") || "[]");
    if (at.length) TOURS.push(...at);
  } catch(e) {}
})();


/* --------------------------------------------------------------------------
 * 3. I18N — English / Turkish dictionaries for UI strings
 * ------------------------------------------------------------------------ */
const I18N = {
  en: {
    "nav.home": "Home", "nav.tours": "Tours", "nav.prices": "Prices",
    "nav.booking": "Booking", "nav.gallery": "Gallery", "nav.about": "About", "nav.contact": "Contact",
    "nav.book": "Book Now",
    "hero.eyebrow": "Curated tours & activities",
    "hero.title.a": "Unforgettable experiences,", "hero.title.b": "wherever you wander",
    "hero.sub": "Handpicked tours and activities with local experts in Turkey, Dubai, London, Cairo and beyond. Free cancellation on most bookings.",
    "hero.search": "Where do you want to go?", "hero.cta": "Search",
    "badge.rated": "4.8 Rated", "badge.cancel": "Free Cancellation", "badge.pickup": "Hotel Pickup",
    "badge.guides": "Expert Local Guides", "badge.price": "Best Price Guarantee",
    "stats.travelers": "Happy Travelers", "stats.activities": "Activities", "stats.rating": "Average Rating", "stats.dests": "Destinations",
    "home.dest.eyebrow": "Pick your dream", "home.dest.title": "Top Destinations",
    "home.dest.sub": "From the Bosphorus to the dunes of Dubai — explore the places our travelers love most.",
    "home.tours.eyebrow": "Most loved", "home.tours.title": "Featured Tours & Activities",
    "home.tours.sub": "Our travelers' favourites, vetted by locals who love what they do.",
    "home.tours.all": "View all tours",
    "home.why.eyebrow": "The Moon Valley way", "home.why.title": "Why Choose Us",
    "why.local.t": "Local Experts", "why.local.d": "Every tour is led by passionate local guides who know their destination inside out.",
    "why.curated.t": "Curated Experiences", "why.curated.d": "We hand-select every activity. If it doesn't meet our quality bar, it doesn't make the cut.",
    "why.cancel.t": "Free Cancellation", "why.cancel.d": "Most activities offer free cancellation up to 24 hours before the start time.",
    "why.support.t": "24/7 Support", "why.support.d": "Our team is available around the clock — before, during and after your trip.",
    "cta.title": "Ready for your next adventure?", "cta.sub": "Tell us where you want to go and we'll craft the perfect day for you.",
    "cta.btn": "Plan my trip", "cta.whatsapp": "Chat on WhatsApp",
    "tours.title": "Tours & Programs", "tours.sub": "Every program includes transparent pricing, clear itineraries and instant booking.",
    "tours.search": "Search tours, cities, activities…", "tours.all": "All destinations",
    "tours.empty.t": "No tours found", "tours.empty.d": "Try a different search term or destination.",
    "tours.details": "Details", "tours.book": "Book Now", "tours.from": "from", "tours.person": "per person",
    "modal.includes": "What's included", "modal.itinerary": "Itinerary", "modal.share": "Share this tour",
    "modal.duration": "Duration", "modal.cancel": "Free cancellation", "modal.pickup": "Hotel pickup",
    "prices.title": "Prices", "prices.sub": "All prices in Euro (EUR), per adult. Children 0–2 free · 3–7 years 30% off.",
    "prices.th.dest": "Destination", "prices.th.tour": "Tour / Program", "prices.th.dur": "Duration", "prices.th.price": "Price", "prices.th.book": "",
    "prices.note": "Museum fee increases, if any, may be reflected in prices. Children who cannot present a passport for age verification are charged the full rate.",
    "booking.title": "Book Your Tour", "booking.sub": "Fill in the form — we confirm availability within hours, with no prepayment.",
    "booking.form.title": "Reservation details",
    "bk.tour": "Tour / Program", "bk.choose": "— Choose a tour —", "bk.date": "Date",
    "bk.adults": "Adults", "bk.children": "Children (3–7 yrs · −30%)", "bk.name": "Full name",
    "bk.email": "Email", "bk.phone": "Phone / WhatsApp", "bk.hotel": "Hotel / pickup point (optional)",
    "bk.notes": "Special requests (optional)", "bk.submit": "Send booking via WhatsApp",
    "bk.submit2": "or send by email", "bk.summary": "Your booking",
    "bk.sum.adults": "Adults", "bk.sum.children": "Children", "bk.sum.total": "Estimated total",
    "bk.sum.note": "Final price is confirmed before any payment. Infants 0–2 travel free.",
    "bk.err.req": "This field is required", "bk.err.email": "Please enter a valid email",
    "bk.err.date": "Please pick a date from tomorrow onwards",
    "bk.ok.t": "Request ready!", "bk.ok.d": "Your booking request was opened in WhatsApp / email. We'll confirm shortly.",
    "bk.new": "Make another booking",
    "gallery.title": "Gallery", "gallery.sub": "Moments captured across our destinations — straight from our tours.",
    "about.title": "About Us", "about.sub": "Travel should feel effortless and extraordinary at the same time.",
    "about.story.eyebrow": "Our story", "about.story.title": "Born from a simple belief",
    "about.p1": "Moon Valley Tours started as a small team of travel enthusiasts frustrated by the gap between generic tour packages and the kind of rich, local experiences that make a trip truly memorable.",
    "about.p2": "Today we connect travelers from around the world with handpicked tours, activities and experiences in Turkey, Dubai, Cairo, London and beyond — all vetted by locals who love what they do.",
    "about.team.eyebrow": "Our team", "about.team.title": "The people behind your trip",
    "about.team.role": "CEO · Founder & Turkey Operations",
    "contact.title": "Contact", "contact.sub": "Questions, custom programs, group rates — we answer fast, in English and Turkish.",
    "contact.info": "Get in touch", "contact.email": "Email", "contact.phone": "Phone",
    "contact.wa": "WhatsApp", "contact.addr": "Office", "contact.social": "Social",
    "contact.map": "Find us in Istanbul", "contact.faq.title": "Frequently Asked Questions",
    "faq.q1": "How do I make a booking?", "faq.a1": "Browse the tours, pick your date and number of travelers and send the booking form — you'll receive a confirmation by WhatsApp or email once it's processed.",
    "faq.q2": "What is the cancellation policy?", "faq.a2": "Activities marked “Free Cancellation” can be cancelled up to 24 hours before the start time for a full refund. Other activities may have different policies.",
    "faq.q3": "Which activities include hotel pickup?", "faq.a3": "Activities with the “Hotel Pickup” badge include complimentary pickup from your hotel or a nearby meeting point — exact details come with your confirmation.",
    "faq.q4": "What currencies and payment methods are accepted?", "faq.a4": "All prices are displayed in Euros (EUR). We accept major credit and debit cards and other payment methods shown at checkout.",
    "faq.q5": "In what languages are tours available?", "faq.a5": "Most tours are available in English; several also run in Spanish or Turkish — this is indicated on the activity page.",
    "faq.q6": "What happens if the operator cancels?", "faq.a6": "If an activity is cancelled by the provider — for weather or safety reasons — you receive a full refund or the option to reschedule at no extra cost.",
    "footer.tag": "Discover extraordinary destinations and create unforgettable memories with our curated travel experiences.",
    "footer.links": "Quick links", "footer.dests": "Destinations", "footer.contact": "Contact us",
    "footer.rights": "All rights reserved.",
    "share.copied": "Link copied to clipboard!",
    "wa.label": "Chat with us on WhatsApp",
    "wa.msg": "Hello Moon Valley Tours! I'd like to get information about a tour.",
  },
  tr: {
    "nav.home": "Ana Sayfa", "nav.tours": "Turlar", "nav.prices": "Fiyatlar",
    "nav.booking": "Rezervasyon", "nav.gallery": "Galeri", "nav.about": "Hakkımızda", "nav.contact": "İletişim",
    "nav.book": "Hemen Ayırt",
    "hero.eyebrow": "Özenle seçilmiş turlar ve aktiviteler",
    "hero.title.a": "Unutulmaz deneyimler,", "hero.title.b": "nereye gitseniz",
    "hero.sub": "Türkiye, Dubai, Londra, Kahire ve ötesinde yerel uzmanlarla özenle seçilmiş turlar. Çoğu rezervasyonda ücretsiz iptal.",
    "hero.search": "Nereye gitmek istersiniz?", "hero.cta": "Ara",
    "badge.rated": "4.8 Puan", "badge.cancel": "Ücretsiz İptal", "badge.pickup": "Otelden Alma",
    "badge.guides": "Uzman Yerel Rehberler", "badge.price": "En İyi Fiyat Garantisi",
    "stats.travelers": "Mutlu Gezgin", "stats.activities": "Aktivite", "stats.rating": "Ortalama Puan", "stats.dests": "Destinasyon",
    "home.dest.eyebrow": "Hayalinizdekini seçin", "home.dest.title": "Popüler Destinasyonlar",
    "home.dest.sub": "Boğaz'dan Dubai çöllerine — gezginlerimizin en sevdiği yerleri keşfedin.",
    "home.tours.eyebrow": "En çok sevilenler", "home.tours.title": "Öne Çıkan Turlar ve Aktiviteler",
    "home.tours.sub": "Gezginlerimizin favorileri; işini seven yerel uzmanların onayından geçti.",
    "home.tours.all": "Tüm turları gör",
    "home.why.eyebrow": "Moon Valley farkı", "home.why.title": "Neden Biz?",
    "why.local.t": "Yerel Uzmanlar", "why.local.d": "Her tur, destinasyonunu avucunun içi gibi bilen tutkulu yerel rehberler eşliğindedir.",
    "why.curated.t": "Özenle Seçilmiş Deneyimler", "why.curated.d": "Her aktiviteyi tek tek seçiyoruz. Kalite çıtamızı geçemeyen, listeye giremez.",
    "why.cancel.t": "Ücretsiz İptal", "why.cancel.d": "Çoğu aktivitede başlangıç saatinden 24 saat öncesine kadar ücretsiz iptal hakkı.",
    "why.support.t": "7/24 Destek", "why.support.d": "Ekibimiz seyahatinizden önce, seyahat sırasında ve sonrasında her an yanınızda.",
    "cta.title": "Bir sonraki maceranıza hazır mısınız?", "cta.sub": "Nereye gitmek istediğinizi söyleyin, sizin için kusursuz bir gün tasarlayalım.",
    "cta.btn": "Seyahatimi planla", "cta.whatsapp": "WhatsApp'tan yazın",
    "tours.title": "Turlar ve Programlar", "tours.sub": "Her programda şeffaf fiyat, net program ve anında rezervasyon.",
    "tours.search": "Tur, şehir veya aktivite arayın…", "tours.all": "Tüm destinasyonlar",
    "tours.empty.t": "Tur bulunamadı", "tours.empty.d": "Farklı bir arama terimi veya destinasyon deneyin.",
    "tours.details": "Detaylar", "tours.book": "Hemen Ayırt", "tours.from": "başlayan", "tours.person": "kişi başı",
    "modal.includes": "Neler dahil", "modal.itinerary": "Program", "modal.share": "Bu turu paylaş",
    "modal.duration": "Süre", "modal.cancel": "Ücretsiz iptal", "modal.pickup": "Otelden alma",
    "prices.title": "Fiyatlar", "prices.sub": "Tüm fiyatlar Euro (EUR) ve yetişkin başınadır. 0–2 yaş ücretsiz · 3–7 yaş %30 indirimli.",
    "prices.th.dest": "Destinasyon", "prices.th.tour": "Tur / Program", "prices.th.dur": "Süre", "prices.th.price": "Fiyat", "prices.th.book": "",
    "prices.note": "Müze giriş ücretlerine gelebilecek zamlar fiyatlara yansıtılabilir. Yaş doğrulaması için pasaport ibraz edilemeyen çocuklara tam ücret uygulanır.",
    "booking.title": "Rezervasyon Yapın", "booking.sub": "Formu doldurun — ön ödeme olmadan, birkaç saat içinde uygunluk onayı verelim.",
    "booking.form.title": "Rezervasyon bilgileri",
    "bk.tour": "Tur / Program", "bk.choose": "— Tur seçin —", "bk.date": "Tarih",
    "bk.adults": "Yetişkin", "bk.children": "Çocuk (3–7 yaş · −%30)", "bk.name": "Ad Soyad",
    "bk.email": "E-posta", "bk.phone": "Telefon / WhatsApp", "bk.hotel": "Otel / alış noktası (opsiyonel)",
    "bk.notes": "Özel istekler (opsiyonel)", "bk.submit": "WhatsApp ile gönder",
    "bk.submit2": "veya e-posta ile gönder", "bk.summary": "Rezervasyonunuz",
    "bk.sum.adults": "Yetişkin", "bk.sum.children": "Çocuk", "bk.sum.total": "Tahmini toplam",
    "bk.sum.note": "Kesin fiyat, ödeme öncesinde onaylanır. 0–2 yaş bebekler ücretsizdir.",
    "bk.err.req": "Bu alan zorunludur", "bk.err.email": "Geçerli bir e-posta girin",
    "bk.err.date": "Lütfen yarından itibaren bir tarih seçin",
    "bk.ok.t": "Talebiniz hazır!", "bk.ok.d": "Rezervasyon talebiniz WhatsApp / e-posta üzerinden açıldı. Kısa süre içinde onaylayacağız.",
    "bk.new": "Yeni rezervasyon yap",
    "gallery.title": "Galeri", "gallery.sub": "Destinasyonlarımızdan kareler — doğrudan turlarımızdan.",
    "about.title": "Hakkımızda", "about.sub": "Seyahat hem zahmetsiz hem de olağanüstü hissettirmeli.",
    "about.story.eyebrow": "Hikâyemiz", "about.story.title": "Basit bir inançtan doğdu",
    "about.p1": "Moon Valley Tours; sıradan tur paketleri ile bir seyahati gerçekten unutulmaz kılan zengin, yerel deneyimler arasındaki uçurumdan rahatsız olan küçük bir gezgin ekibi tarafından kuruldu.",
    "about.p2": "Bugün dünyanın dört bir yanından gezginleri Türkiye, Dubai, Kahire, Londra ve ötesinde özenle seçilmiş turlarla buluşturuyoruz — hepsi işini seven yerel uzmanların onayından geçiyor.",
    "about.team.eyebrow": "Ekibimiz", "about.team.title": "Seyahatinizin arkasındaki insanlar",
    "about.team.role": "CEO · Kurucu ve Türkiye Operasyonları",
    "contact.title": "İletişim", "contact.sub": "Sorular, özel programlar, grup fiyatları — İngilizce ve Türkçe hızla yanıtlıyoruz.",
    "contact.info": "Bize ulaşın", "contact.email": "E-posta", "contact.phone": "Telefon",
    "contact.wa": "WhatsApp", "contact.addr": "Ofis", "contact.social": "Sosyal medya",
    "contact.map": "İstanbul'da bizi bulun", "contact.faq.title": "Sıkça Sorulan Sorular",
    "faq.q1": "Nasıl rezervasyon yapabilirim?", "faq.a1": "Turlara göz atın, tarihinizi ve kişi sayısını seçip formu gönderin — işleme alındığında WhatsApp veya e-posta ile onay alırsınız.",
    "faq.q2": "İptal politikası nedir?", "faq.a2": "“Ücretsiz İptal” işaretli aktiviteler, başlangıç saatinden 24 saat öncesine kadar tam iade ile iptal edilebilir. Diğer aktivitelerde farklı koşullar olabilir.",
    "faq.q3": "Hangi aktivitelerde otelden alma var?", "faq.a3": "“Otelden Alma” rozetli aktivitelerde otelinizden veya yakın bir buluşma noktasından ücretsiz alış dahildir — detaylar onayınızla birlikte iletilir.",
    "faq.q4": "Hangi para birimleri ve ödeme yöntemleri geçerli?", "faq.a4": "Tüm fiyatlar Euro (EUR) olarak gösterilir. Başlıca kredi/banka kartları ve ödeme sayfasındaki diğer yöntemler kabul edilir.",
    "faq.q5": "Turlar hangi dillerde yapılıyor?", "faq.a5": "Turların çoğu İngilizce'dir; bazıları İspanyolca veya Türkçe de düzenlenir — bu bilgi aktivite sayfasında belirtilir.",
    "faq.q6": "Operatör iptal ederse ne olur?", "faq.a6": "Bir aktivite sağlayıcı tarafından (hava veya güvenlik nedeniyle) iptal edilirse tam iade ya da ücretsiz yeni tarih hakkı sunulur.",
    "footer.tag": "Özenle seçilmiş seyahat deneyimlerimizle olağanüstü destinasyonlar keşfedin, unutulmaz anılar biriktirin.",
    "footer.links": "Hızlı bağlantılar", "footer.dests": "Destinasyonlar", "footer.contact": "İletişim",
    "footer.rights": "Tüm hakları saklıdır.",
    "share.copied": "Bağlantı panoya kopyalandı!",
    "wa.label": "WhatsApp'tan bize yazın",
    "wa.msg": "Merhaba Moon Valley Tours! Bir tur hakkında bilgi almak istiyorum.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.tours": "Tours",
    "nav.prices": "Precios",
    "nav.booking": "Reserva",
    "nav.gallery": "Galería",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.book": "Reservar",
    "hero.eyebrow": "Tours y actividades seleccionadas",
    "hero.title.a": "Experiencias inolvidables,",
    "hero.title.b": "donde quiera que vayas",
    "hero.sub": "Tours y actividades con expertos locales en Turquía, Dubái, Londres, El Cairo y más. Cancelación gratuita en la mayoría de reservas.",
    "hero.search": "¿Adónde quieres ir?",
    "hero.cta": "Buscar",
    "badge.rated": "4.8 de valoración",
    "badge.cancel": "Cancelación gratuita",
    "badge.pickup": "Recogida en hotel",
    "badge.guides": "Guías locales expertos",
    "badge.price": "Mejor precio garantizado",
    "stats.travelers": "Viajeros felices",
    "stats.activities": "Actividades",
    "stats.rating": "Valoración media",
    "stats.dests": "Destinos",
    "home.dest.eyebrow": "Elige tu destino",
    "home.dest.title": "Destinos populares",
    "home.dest.sub": "Desde el Bósforo hasta las dunas de Dubái — explora los lugares que más aman nuestros viajeros.",
    "home.tours.eyebrow": "Los más amados",
    "home.tours.title": "Tours y actividades destacadas",
    "home.tours.sub": "Los favoritos de nuestros viajeros, avalados por locales apasionados.",
    "home.tours.all": "Ver todos los tours",
    "home.why.eyebrow": "El estilo Moon Valley",
    "home.why.title": "¿Por qué elegirnos?",
    "why.local.t": "Expertos locales",
    "why.local.d": "Cada tour está dirigido por guías locales apasionados que conocen su destino a fondo.",
    "why.curated.t": "Experiencias seleccionadas",
    "why.curated.d": "Elegimos cada actividad a mano. Si no cumple nuestro estándar de calidad, no la incluimos.",
    "why.cancel.t": "Cancelación gratuita",
    "why.cancel.d": "La mayoría de actividades ofrecen cancelación gratuita hasta 24 horas antes del inicio.",
    "why.support.t": "Soporte 24/7",
    "why.support.d": "Nuestro equipo está disponible todo el tiempo — antes, durante y después de tu viaje.",
    "cta.title": "¿Listo para tu próxima aventura?",
    "cta.sub": "Dinos adónde quieres ir y crearemos el día perfecto para ti.",
    "cta.btn": "Planifica mi viaje",
    "cta.whatsapp": "Chatear por WhatsApp",
    "tours.title": "Tours y programas",
    "tours.sub": "Cada programa incluye precios transparentes, itinerarios claros y reserva inmediata.",
    "tours.search": "Buscar tours, ciudades, actividades…",
    "tours.all": "Todos los destinos",
    "tours.empty.t": "No se encontraron tours",
    "tours.empty.d": "Prueba un término de búsqueda o destino diferente.",
    "tours.details": "Detalles",
    "tours.book": "Reservar",
    "tours.from": "desde",
    "tours.person": "por persona",
    "modal.includes": "Qué está incluido",
    "modal.itinerary": "Itinerario",
    "modal.share": "Compartir este tour",
    "modal.duration": "Duración",
    "modal.cancel": "Cancelación gratuita",
    "modal.pickup": "Recogida en hotel",
    "prices.title": "Precios",
    "prices.sub": "Todos los precios en Euros (EUR), por adulto. Niños 0–2 gratis · 3–7 años 30% descuento.",
    "prices.th.dest": "Destino",
    "prices.th.tour": "Tour / Programa",
    "prices.th.dur": "Duración",
    "prices.th.price": "Precio",
    "prices.th.book": "",
    "prices.note": "Los aumentos en tarifas de museos pueden reflejarse en los precios.",
    "booking.title": "Reserva tu tour",
    "booking.sub": "Rellena el formulario — confirmamos disponibilidad en horas, sin prepago.",
    "booking.form.title": "Detalles de reserva",
    "bk.tour": "Tour / Programa",
    "bk.choose": "— Elige un tour —",
    "bk.date": "Fecha",
    "bk.adults": "Adultos",
    "bk.children": "Niños (3–7 años · −30%)",
    "bk.name": "Nombre completo",
    "bk.email": "Correo electrónico",
    "bk.phone": "Teléfono / WhatsApp",
    "bk.hotel": "Hotel / punto de recogida (opcional)",
    "bk.notes": "Peticiones especiales (opcional)",
    "bk.submit": "Enviar reserva por WhatsApp",
    "bk.submit2": "o enviar por correo",
    "bk.summary": "Tu reserva",
    "bk.sum.adults": "Adultos",
    "bk.sum.children": "Niños",
    "bk.sum.total": "Total estimado",
    "bk.sum.note": "El precio final se confirma antes de cualquier pago. Bebés 0–2 viajan gratis.",
    "bk.err.req": "Este campo es obligatorio",
    "bk.err.email": "Por favor introduce un correo válido",
    "bk.err.date": "Por favor elige una fecha a partir de mañana",
    "bk.ok.t": "¡Solicitud lista!",
    "bk.ok.d": "Tu solicitud de reserva se abrió en WhatsApp / correo. Te confirmaremos pronto.",
    "bk.new": "Hacer otra reserva",
    "gallery.title": "Galería",
    "gallery.sub": "Momentos capturados en nuestros destinos — directamente de nuestros tours.",
    "about.title": "Sobre nosotros",
    "about.sub": "Viajar debe sentirse fácil y extraordinario al mismo tiempo.",
    "about.story.eyebrow": "Nuestra historia",
    "about.story.title": "Nacido de una creencia simple",
    "about.p1": "Moon Valley Tours empezó como un pequeño equipo de entusiastas del viaje frustrados por la brecha entre los paquetes turísticos genéricos y las experiencias locales ricas que hacen un viaje verdaderamente memorable.",
    "about.p2": "Hoy conectamos viajeros de todo el mundo con tours y experiencias seleccionadas en Turquía, Dubái, El Cairo, Londres y más — todos avalados por locales que aman lo que hacen.",
    "about.team.eyebrow": "Nuestro equipo",
    "about.team.title": "Las personas detrás de tu viaje",
    "about.team.role": "CEO · Fundador y Operaciones Turquía",
    "contact.title": "Contacto",
    "contact.sub": "Preguntas, programas personalizados, tarifas grupales — respondemos rápido en inglés, turco, árabe y español.",
    "contact.info": "Ponte en contacto",
    "contact.email": "Correo",
    "contact.phone": "Teléfono",
    "contact.wa": "WhatsApp",
    "contact.addr": "Oficina",
    "contact.social": "Redes sociales",
    "contact.map": "Encuéntranos en Estambul",
    "contact.faq.title": "Preguntas frecuentes",
    "faq.q1": "¿Cómo hago una reserva?",
    "faq.a1": "Navega por los tours, elige tu fecha y número de viajeros y envía el formulario — recibirás una confirmación por WhatsApp o correo cuando se procese.",
    "faq.q2": "¿Cuál es la política de cancelación?",
    "faq.a2": "Las actividades marcadas \"Cancelación gratuita\" pueden cancelarse hasta 24 horas antes del inicio para un reembolso completo.",
    "faq.q3": "¿Qué actividades incluyen recogida en hotel?",
    "faq.a3": "Las actividades con el distintivo \"Recogida en hotel\" incluyen recogida gratuita desde tu hotel o un punto de encuentro cercano.",
    "faq.q4": "¿Qué monedas y métodos de pago se aceptan?",
    "faq.a4": "Todos los precios se muestran en Euros (EUR). Aceptamos las principales tarjetas de crédito y débito.",
    "faq.q5": "¿En qué idiomas están disponibles los tours?",
    "faq.a5": "La mayoría de tours están disponibles en inglés; varios también se realizan en español, turco o árabe.",
    "faq.q6": "¿Qué pasa si el operador cancela?",
    "faq.a6": "Si una actividad es cancelada por el proveedor — por clima o seguridad — recibes un reembolso completo o la opción de reprogramar sin coste adicional.",
    "footer.tag": "Descubre destinos extraordinarios y crea recuerdos inolvidables con nuestras experiencias de viaje seleccionadas.",
    "footer.links": "Enlaces rápidos",
    "footer.dests": "Destinos",
    "footer.contact": "Contáctanos",
    "footer.rights": "Todos los derechos reservados.",
    "share.copied": "¡Enlace copiado al portapapeles!",
    "wa.label": "Chatea con nosotros por WhatsApp",
    "wa.msg": "¡Hola Moon Valley Tours! Me gustaría obtener información sobre un tour."
},
  ar: {
    "nav.home": "الرئيسية",
    "nav.tours": "الجولات",
    "nav.prices": "الأسعار",
    "nav.booking": "الحجز",
    "nav.gallery": "المعرض",
    "nav.about": "عنا",
    "nav.contact": "اتصل بنا",
    "nav.book": "احجز الآن",
    "hero.eyebrow": "جولات وأنشطة مختارة بعناية",
    "hero.title.a": "تجارب لا تُنسى،",
    "hero.title.b": "أينما رحلت",
    "hero.sub": "جولات وأنشطة مختارة مع خبراء محليين في تركيا، دبي، لندن، القاهرة والمزيد. إلغاء مجاني لمعظم الحجوزات.",
    "hero.search": "إلى أين تريد الذهاب؟",
    "hero.cta": "بحث",
    "badge.rated": "تقييم 4.8",
    "badge.cancel": "إلغاء مجاني",
    "badge.pickup": "توصيل من الفندق",
    "badge.guides": "مرشدون محليون خبراء",
    "badge.price": "ضمان أفضل سعر",
    "stats.travelers": "مسافر سعيد",
    "stats.activities": "نشاط",
    "stats.rating": "متوسط التقييم",
    "stats.dests": "وجهة",
    "home.dest.eyebrow": "اختر وجهة أحلامك",
    "home.dest.title": "أبرز الوجهات",
    "home.dest.sub": "من مضيق البوسفور إلى كثبان دبي — استكشف الأماكن التي يحبها مسافرونا أكثر.",
    "home.tours.eyebrow": "الأكثر شعبية",
    "home.tours.title": "جولات وأنشطة مميزة",
    "home.tours.sub": "مفضلات مسافرينا، معتمدة من مرشدين محليين شغوفين.",
    "home.tours.all": "عرض جميع الجولات",
    "home.why.eyebrow": "أسلوب Moon Valley",
    "home.why.title": "لماذا تختارنا؟",
    "why.local.t": "خبراء محليون",
    "why.local.d": "كل جولة يقودها مرشدون محليون متحمسون يعرفون وجهتهم جيداً.",
    "why.curated.t": "تجارب مختارة بعناية",
    "why.curated.d": "نختار كل نشاط بدقة. إذا لم يلبِ معاييرنا، فلن يكون ضمن قائمتنا.",
    "why.cancel.t": "إلغاء مجاني",
    "why.cancel.d": "تتيح معظم الأنشطة الإلغاء المجاني حتى 24 ساعة قبل موعد البدء.",
    "why.support.t": "دعم على مدار الساعة",
    "why.support.d": "فريقنا متاح في كل وقت — قبل رحلتك وخلالها وبعدها.",
    "cta.title": "هل أنت مستعد لمغامرتك القادمة؟",
    "cta.sub": "أخبرنا بوجهتك وسنصمم لك يوماً مثالياً.",
    "cta.btn": "خطط لرحلتي",
    "cta.whatsapp": "تحدث معنا عبر واتساب",
    "tours.title": "الجولات والبرامج",
    "tours.sub": "كل برنامج يتضمن أسعاراً شفافة، وجداول واضحة وحجزاً فورياً.",
    "tours.search": "ابحث عن جولات، مدن، أنشطة…",
    "tours.all": "جميع الوجهات",
    "tours.empty.t": "لم يُعثر على جولات",
    "tours.empty.d": "جرّب كلمة بحث أو وجهة مختلفة.",
    "tours.details": "التفاصيل",
    "tours.book": "احجز الآن",
    "tours.from": "من",
    "tours.person": "للشخص",
    "modal.includes": "ماذا يشمل",
    "modal.itinerary": "البرنامج",
    "modal.share": "شارك هذه الجولة",
    "modal.duration": "المدة",
    "modal.cancel": "إلغاء مجاني",
    "modal.pickup": "توصيل من الفندق",
    "prices.title": "الأسعار",
    "prices.sub": "جميع الأسعار باليورو (EUR) للبالغ الواحد. الأطفال 0–2 مجاناً · 3–7 سنوات خصم 30%.",
    "prices.th.dest": "الوجهة",
    "prices.th.tour": "الجولة / البرنامج",
    "prices.th.dur": "المدة",
    "prices.th.price": "السعر",
    "prices.th.book": "",
    "prices.note": "قد تنعكس أي زيادات في رسوم المتاحف على الأسعار.",
    "booking.title": "احجز جولتك",
    "booking.sub": "املأ النموذج — نؤكد التوفر خلال ساعات، بدون دفع مسبق.",
    "booking.form.title": "تفاصيل الحجز",
    "bk.tour": "الجولة / البرنامج",
    "bk.choose": "— اختر جولة —",
    "bk.date": "التاريخ",
    "bk.adults": "البالغون",
    "bk.children": "الأطفال (3–7 سنوات · −30%)",
    "bk.name": "الاسم الكامل",
    "bk.email": "البريد الإلكتروني",
    "bk.phone": "الهاتف / واتساب",
    "bk.hotel": "الفندق / نقطة الالتقاء (اختياري)",
    "bk.notes": "طلبات خاصة (اختياري)",
    "bk.submit": "إرسال الحجز عبر واتساب",
    "bk.submit2": "أو إرسال عبر البريد",
    "bk.summary": "حجزك",
    "bk.sum.adults": "البالغون",
    "bk.sum.children": "الأطفال",
    "bk.sum.total": "الإجمالي التقديري",
    "bk.sum.note": "يتم تأكيد السعر النهائي قبل أي دفع. الأطفال 0–2 مجاناً.",
    "bk.err.req": "هذا الحقل مطلوب",
    "bk.err.email": "يرجى إدخال بريد إلكتروني صحيح",
    "bk.err.date": "يرجى اختيار تاريخ من الغد فصاعداً",
    "bk.ok.t": "طلبك جاهز!",
    "bk.ok.d": "تم فتح طلب حجزك في واتساب / البريد الإلكتروني. سنؤكده قريباً.",
    "bk.new": "إجراء حجز آخر",
    "gallery.title": "المعرض",
    "gallery.sub": "لحظات ملتقطة من وجهاتنا — مباشرة من جولاتنا.",
    "about.title": "من نحن",
    "about.sub": "يجب أن تكون الرحلة سهلة وغير عادية في الوقت ذاته.",
    "about.story.eyebrow": "قصتنا",
    "about.story.title": "وُلدت من إيمان بسيط",
    "about.p1": "بدأت Moon Valley Tours كفريق صغير من عشاق السفر محبطين من الهوة بين باقات الجولات التقليدية والتجارب المحلية الغنية التي تجعل الرحلة لا تُنسى.",
    "about.p2": "اليوم نربط المسافرين من جميع أنحاء العالم بجولات وتجارب مختارة في تركيا، دبي، القاهرة، لندن والمزيد — جميعها معتمدة من محليين يحبون ما يفعلونه.",
    "about.team.eyebrow": "فريقنا",
    "about.team.title": "الأشخاص وراء رحلتك",
    "about.team.role": "الرئيس التنفيذي · المؤسس وعمليات تركيا",
    "contact.title": "اتصل بنا",
    "contact.sub": "أسئلة، برامج مخصصة، أسعار مجموعات — نرد بسرعة بالعربية والإنجليزية والتركية والإسبانية.",
    "contact.info": "تواصل معنا",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.wa": "واتساب",
    "contact.addr": "المكتب",
    "contact.social": "التواصل الاجتماعي",
    "contact.map": "جدنا في إسطنبول",
    "contact.faq.title": "الأسئلة الشائعة",
    "faq.q1": "كيف أحجز؟",
    "faq.a1": "تصفح الجولات، اختر تاريخك وعدد المسافرين وأرسل نموذج الحجز — ستتلقى تأكيداً عبر واتساب أو البريد الإلكتروني بعد معالجته.",
    "faq.q2": "ما هي سياسة الإلغاء؟",
    "faq.a2": "يمكن إلغاء الأنشطة المعلّمة بـ 'إلغاء مجاني' حتى 24 ساعة قبل موعد البدء لاسترداد كامل للمبلغ.",
    "faq.q3": "ما الأنشطة التي تشمل التوصيل من الفندق؟",
    "faq.a3": "الأنشطة ذات شارة 'توصيل من الفندق' تشمل توصيلاً مجانياً من فندقك أو نقطة اجتماع قريبة.",
    "faq.q4": "ما العملات وطرق الدفع المقبولة؟",
    "faq.a4": "تُعرض جميع الأسعار باليورو (EUR). نقبل بطاقات الائتمان والخصم الرئيسية.",
    "faq.q5": "بأي لغات تتوفر الجولات؟",
    "faq.a5": "معظم الجولات متاحة بالإنجليزية؛ وبعضها يُقام بالإسبانية أو التركية أو العربية.",
    "faq.q6": "ماذا يحدث إذا ألغى المشغّل؟",
    "faq.a6": "إذا ألغى المزود نشاطاً لأسباب جوية أو أمنية — تحصل على استرداد كامل أو خيار إعادة الجدولة بدون تكلفة إضافية.",
    "footer.tag": "اكتشف وجهات استثنائية وأنشئ ذكريات لا تُنسى مع تجارب سفرنا المختارة.",
    "footer.links": "روابط سريعة",
    "footer.dests": "الوجهات",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "share.copied": "تم نسخ الرابط إلى الحافظة!",
    "wa.label": "تحدث معنا عبر واتساب",
    "wa.msg": "مرحباً Moon Valley Tours! أرغب في الحصول على معلومات حول إحدى الجولات."
},
};

/* --------------------------------------------------------------------------
 * 4. Language helpers
 * ------------------------------------------------------------------------ */
const LANG_KEY = "mv-lang";
function getLang() { return localStorage.getItem(LANG_KEY) || "en"; }
function t(key) { return (I18N[getLang()] && I18N[getLang()][key]) || I18N.en[key] || key; }
function tt(tour, field) {
  const L = getLang();
  return (tour.i18n[L] && tour.i18n[L][field]) || (tour.i18n.en && tour.i18n.en[field]) || "";
}
function destName(d) { const L = getLang(); return d.name[L] || d.name.en; }

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  applyI18n();
  document.dispatchEvent(new CustomEvent("mv:lang"));
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  document.querySelectorAll(".lang-switch button").forEach((b) => b.classList.toggle("is-on", b.dataset.lang === getLang()));
}

/* --------------------------------------------------------------------------
 * 5. Small utilities
 * ------------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const money = (n) => "€" + n.toLocaleString({"tr":"tr-TR","ar":"ar-SA","es":"es-ES"}[getLang()] || "en-GB");
const bySlug = (slug) => TOURS.find((x) => x.slug === slug);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function toast(msg) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("is-show"), 2400);
}

function waLink(message) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* Icons (inline SVG, stroke style) */
const ICONS = {
  clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  search: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  share: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="6" cy="12" r="2.6"/><circle cx="17" cy="5.5" r="2.6"/><circle cx="17" cy="18.5" r="2.6"/><path d="m8.4 10.8 6.3-3.9M8.4 13.2l6.3 3.9"/></svg>',
  wa: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.8l.4-.5c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.1-.6 3.5a12 12 0 0 0 4.5 5c2 1.1 2.8 1.2 3.8 1 .6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3Z"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
  fb: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l-.4 3H14v9h-3.5v-9H8V9h2.5V7.2C10.5 4.9 11.9 3 14.7 3H17v3h-1.7c-1 0-1.3.5-1.3 1.4V9Z"/></svg>',
  ig: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none"/></svg>',
  tw: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.7 3H21l-7.2 8.3L22.3 21h-6.6l-5.2-6.1L4.6 21H1.3l7.7-8.9L1.7 3h6.8l4.7 5.6L17.7 3Zm-1.2 16h1.8L7.1 4.9H5.2L16.5 19Z"/></svg>',
  link: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
};

/* --------------------------------------------------------------------------
 * 6. Shared UI: header, nav, WhatsApp float, footer, reveal-on-scroll
 * ------------------------------------------------------------------------ */
function initShell() {
  const header = $(".site-header");
  const onScroll = () => {
    header && header.classList.toggle("is-scrolled", window.scrollY > 10);
    const top = $(".to-top");
    top && top.classList.toggle("is-show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const toggle = $(".nav-toggle");
  toggle && toggle.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  $$(".main-nav a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("nav-open")));

  // Language switch
  $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Floating WhatsApp button (injected on every page)
  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.innerHTML = ICONS.wa;
  const setWa = () => { wa.href = waLink(t("wa.msg")); wa.setAttribute("aria-label", t("wa.label")); wa.title = t("wa.label"); };
  setWa();
  document.addEventListener("mv:lang", setWa);
  document.body.appendChild(wa);

  // Back to top
  const top = document.createElement("button");
  top.className = "to-top";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>';
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(top);

  // Footer year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  applyI18n();
  document.documentElement.lang = getLang();
}

/* --------------------------------------------------------------------------
 * 7. Tour card component
 * ------------------------------------------------------------------------ */
function tourCard(tour) {
  const tags = [];
  if (tour.freeCancellation) tags.push(`<span class="tag">${esc(t("badge.cancel"))}</span>`);
  if (tour.hotelPickup) tags.push(`<span class="tag tag--gold">${esc(t("badge.pickup"))}</span>`);
  return `
  <article class="tour-card reveal" data-slug="${esc(tour.slug)}" tabindex="0" role="button"
           aria-label="${esc(tt(tour, "title"))}">
    <div class="tour-card__media">
      <img src="${esc(tour.images[0])}" alt="${esc(tt(tour, "title"))}" loading="lazy" width="640" height="400">
      <div class="tour-card__tags">${tags.join("")}</div>
      <div class="tour-card__price">${money(tour.price)} <small>/ ${esc(t("tours.person"))}</small></div>
    </div>
    <div class="tour-card__body">
      <span class="tour-card__where">${ICONS.pin} ${esc(tour.cityName[getLang()] || tour.cityName.en)} · ${esc(tour.countryName[getLang()] || tour.countryName.en)}</span>
      <h3 class="tour-card__title">${esc(tt(tour, "title"))}</h3>
      <p class="tour-card__desc">${esc(tt(tour, "desc"))}</p>
      <div class="tour-card__meta"><span>${ICONS.clock} ${esc(tt(tour, "dur"))}</span></div>
      <div class="tour-card__actions">
        <button class="btn btn--ghost btn--sm" data-act="details">${esc(t("tours.details"))}</button>
        <a class="btn btn--brand btn--sm" data-act="book" href="booking.html?tour=${encodeURIComponent(tour.slug)}">${esc(t("tours.book"))}</a>
      </div>
    </div>
  </article>`;
}

function bindTourCards(container) {
  container.addEventListener("click", (e) => {
    const book = e.target.closest('[data-act="book"]');
    if (book) { e.stopPropagation(); return; } // let the link navigate
    const card = e.target.closest(".tour-card");
    if (card) openTourModal(card.dataset.slug);
  });
  container.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const card = e.target.closest(".tour-card");
      if (card) openTourModal(card.dataset.slug);
    }
  });
}

/* --------------------------------------------------------------------------
 * 8. Tour detail modal (gallery, itinerary, includes, share, book)
 * ------------------------------------------------------------------------ */
function ensureModal() {
  let modal = $("#tour-modal");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.id = "tour-modal";
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = '<div class="modal__card"></div>';
  modal.addEventListener("click", (e) => { if (e.target === modal) closeTourModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeTourModal(); });
  document.body.appendChild(modal);
  return modal;
}

function openTourModal(slug) {
  const tour = bySlug(slug);
  if (!tour) return;
  const modal = ensureModal();
  const card = $(".modal__card", modal);
  const inc = tt(tour, "inc").map((x) => `<li>${esc(x)}</li>`).join("");
  const itin = tt(tour, "itin").map((x) => `<li>${esc(x)}</li>`).join("");
  const thumbs = tour.images.length > 1
    ? `<div class="modal__thumbs">${tour.images.map((src, i) =>
        `<img src="${esc(src)}" alt="" data-i="${i}" class="${i === 0 ? "is-on" : ""}" loading="lazy">`).join("")}</div>`
    : "";
  card.innerHTML = `
    <div class="modal__media">
      <img id="modal-hero" src="${esc(tour.images[0])}" alt="${esc(tt(tour, "title"))}">
      ${thumbs}
      <button class="modal__close" aria-label="Close">✕</button>
    </div>
    <div class="modal__body">
      <div class="modal__head">
        <div>
          <span class="tour-card__where">${ICONS.pin} ${esc(tour.cityName[getLang()] || tour.cityName.en)} · ${esc(tour.countryName[getLang()] || tour.countryName.en)}</span>
          <h2 class="modal__title">${esc(tt(tour, "title"))}</h2>
        </div>
        <div class="modal__price"><b>${money(tour.price)}</b><small>${esc(t("tours.person"))}</small></div>
      </div>
      <p style="color:var(--mist)">${esc(tt(tour, "desc"))}</p>
      <div class="modal__meta">
        <span class="pill">${ICONS.clock} ${esc(t("modal.duration"))}: ${esc(tt(tour, "dur"))}</span>
        ${tour.freeCancellation ? `<span class="pill">${ICONS.check} ${esc(t("modal.cancel"))}</span>` : ""}
        ${tour.hotelPickup ? `<span class="pill pill--gold">${ICONS.check} ${esc(t("modal.pickup"))}</span>` : ""}
      </div>
      <div class="modal__cols">
        <div><h4>${ICONS.check} ${esc(t("modal.includes"))}</h4><ul>${inc}</ul></div>
        <div><h4>${ICONS.pin} ${esc(t("modal.itinerary"))}</h4><ul class="itin">${itin}</ul></div>
      </div>
      <div class="modal__foot">
        <a class="btn btn--brand" href="booking.html?tour=${encodeURIComponent(tour.slug)}">${esc(t("tours.book"))} — ${money(tour.price)}</a>
        <div class="share-row" aria-label="${esc(t("modal.share"))}">
          <button class="share-btn" data-share="native" title="${esc(t("modal.share"))}">${ICONS.share}</button>
          <button class="share-btn" data-share="wa" title="WhatsApp">${ICONS.wa.replace('width="28" height="28"', 'width="18" height="18"')}</button>
          <button class="share-btn" data-share="fb" title="Facebook">${ICONS.fb}</button>
          <button class="share-btn" data-share="tw" title="X / Twitter">${ICONS.tw}</button>
          <button class="share-btn" data-share="copy" title="Copy link">${ICONS.link}</button>
        </div>
      </div>
    </div>`;

  // thumbnail switching
  $$(".modal__thumbs img", card).forEach((th) => th.addEventListener("click", () => {
    $("#modal-hero", card).src = tour.images[+th.dataset.i];
    $$(".modal__thumbs img", card).forEach((x) => x.classList.toggle("is-on", x === th));
  }));
  $(".modal__close", card).addEventListener("click", closeTourModal);

  // share actions
  const shareUrl = location.origin + location.pathname.replace(/[^/]*$/, "") + "programs.html#" + tour.slug;
  const shareText = `${tt(tour, "title")} — ${money(tour.price)} · Moon Valley Tours`;
  card.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-share]");
    if (!btn) return;
    const kind = btn.dataset.share;
    if (kind === "native" && navigator.share) {
      try { await navigator.share({ title: shareText, url: shareUrl }); } catch (_) { /* user cancelled */ }
    } else if (kind === "wa") {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`, "_blank", "noopener");
    } else if (kind === "fb") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener");
    } else if (kind === "tw") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank", "noopener");
    } else {
      try { await navigator.clipboard.writeText(shareUrl); toast(t("share.copied")); }
      catch (_) { prompt("URL:", shareUrl); }
    }
  });

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#" + tour.slug);
}

function closeTourModal() {
  const modal = $("#tour-modal");
  if (!modal || !modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname + location.search);
}

/* --------------------------------------------------------------------------
 * 9. Page: HOME
 * ------------------------------------------------------------------------ */
function initHome() {
  // Hero slideshow from official site imagery
  const heroImgs = $$(".hero__bg img");
  let idx = 0;
  if (heroImgs.length > 1) {
    setInterval(() => {
      heroImgs[idx].classList.remove("is-on");
      idx = (idx + 1) % heroImgs.length;
      heroImgs[idx].classList.add("is-on");
    }, 6000);
  }

  // Hero search → programs page
  const form = $("#hero-search");
  form && form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("input", form).value.trim();
    location.href = "programs.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });

  // Destinations grid
  const dg = $("#dest-grid");
  const renderDests = () => {
    dg.innerHTML = DESTS.map((d) => `
      <figure class="dest-card reveal" data-slug="${esc(d.slug)}" tabindex="0" role="link" aria-label="${esc(destName(d))}">
        <img src="${esc(d.img)}" alt="${esc(destName(d))}" loading="lazy" width="480" height="640">
        <figcaption><b>${esc(destName(d))}</b><span>${esc(d.country[getLang()] || d.country.en)}</span></figcaption>
      </figure>`).join("");
    $$(".reveal", dg).forEach((el) => el.classList.add("is-in"));
  };
  renderDests();
  dg.addEventListener("click", (e) => {
    const c = e.target.closest(".dest-card");
    if (c) location.href = "programs.html?dest=" + encodeURIComponent(c.dataset.slug);
  });

  // Featured tours: top 6 (most expensive experiences first feels premium; use curated order)
  const featured = ["capadoccia-hot-air-balloon-sunrise", "istanbul-bosphorus-sunset-cruise", "dubai-desert-safari-bbq",
    "cairo-pyramids-sphinx-tour", "bodrum-aegean-sunset-sailing", "buenos-aires-tango-show-dinner"];
  const tg = $("#featured-grid");
  const renderFeatured = () => {
    tg.innerHTML = featured.map((s) => tourCard(bySlug(s))).filter(Boolean).join("");
    $$(".reveal", tg).forEach((el) => el.classList.add("is-in"));
  };
  renderFeatured();
  bindTourCards(tg);

  document.addEventListener("mv:lang", () => { renderDests(); renderFeatured(); });
}

/* --------------------------------------------------------------------------
 * 10. Page: PROGRAMS (search + filters + deep links)
 * ------------------------------------------------------------------------ */
function initPrograms() {
  const grid = $("#tour-grid");
  const input = $("#tour-search");
  const chips = $("#dest-chips");
  const params = new URLSearchParams(location.search);
  let q = params.get("q") || "";
  let dest = params.get("dest") || "";

  input.value = q;

  const renderChips = () => {
    chips.innerHTML = `<button class="chip ${dest ? "" : "is-on"}" data-d="">${esc(t("tours.all"))}</button>` +
      DESTS.map((d) => `<button class="chip ${dest === d.slug ? "is-on" : ""}" data-d="${esc(d.slug)}">${esc(destName(d))}</button>`).join("");
  };

  const matches = (tour) => {
    if (dest && tour.citySlug !== dest) return false;
    if (!q) return true;
    const hay = [tt(tour, "title"), tt(tour, "desc"), tour.cityName.en, tour.cityName.tr,
      tour.countryName.en, tour.countryName.tr, tour.i18n.en.title, tour.i18n.en.desc].join(" ").toLowerCase();
    return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
  };

  const render = () => {
    renderChips();
    const list = TOURS.filter(matches);
    grid.innerHTML = list.length
      ? list.map(tourCard).join("")
      : `<div class="results-empty" style="grid-column:1/-1"><b>${esc(t("tours.empty.t"))}</b>${esc(t("tours.empty.d"))}</div>`;
    $$(".reveal", grid).forEach((el) => el.classList.add("is-in"));
    $("#tour-count").textContent = list.length;
  };

  input.addEventListener("input", () => { q = input.value.trim(); render(); });
  chips.addEventListener("click", (e) => {
    const c = e.target.closest(".chip");
    if (!c) return;
    dest = c.dataset.d;
    render();
  });
  bindTourCards(grid);
  render();

  document.addEventListener("mv:lang", render);

  // Deep link: programs.html#tour-slug opens the modal
  if (location.hash.length > 1) {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (bySlug(slug)) setTimeout(() => openTourModal(slug), 250);
  }
}

/* --------------------------------------------------------------------------
 * 11. Page: PRICES
 * ------------------------------------------------------------------------ */
function initPrices() {
  const tbody = $("#price-rows");
  const render = () => {
    const sorted = [...TOURS].sort((a, b) =>
      (a.cityName.en + a.i18n.en.title).localeCompare(b.cityName.en + b.i18n.en.title));
    tbody.innerHTML = sorted.map((tour) => `
      <tr>
        <td><span class="pt-city">${esc(tour.cityName[getLang()] || tour.cityName.en)}</span></td>
        <td><span class="pt-name">${esc(tt(tour, "title"))}</span></td>
        <td>${esc(tt(tour, "dur"))}</td>
        <td><span class="pt-price">${money(tour.price)}</span></td>
        <td><a class="btn btn--brand btn--sm" href="booking.html?tour=${encodeURIComponent(tour.slug)}">${esc(t("tours.book"))}</a></td>
      </tr>`).join("");
  };
  render();
  document.addEventListener("mv:lang", render);
}

/* --------------------------------------------------------------------------
 * 12. Page: BOOKING
 * ------------------------------------------------------------------------ */
function initBooking() {
  const form = $("#booking-form");
  const sel = $("#bk-tour");
  const params = new URLSearchParams(location.search);

  const fillSelect = () => {
    const current = sel.value || params.get("tour") || "";
    sel.innerHTML = `<option value="">${esc(t("bk.choose"))}</option>` +
      TOURS.map((x) => `<option value="${esc(x.slug)}" ${x.slug === current ? "selected" : ""}>
        ${esc((x.cityName[getLang()] || x.cityName.en) + " — " + tt(x, "title"))} (${money(x.price)})</option>`).join("");
  };
  fillSelect();

  // min date = tomorrow
  const dateInput = $("#bk-date");
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  dateInput.min = tomorrow;

  const summary = {
    img: $("#sum-img"), title: $("#sum-title"), rows: $("#sum-rows"), total: $("#sum-total"),
  };

  const refreshSummary = () => {
    const tour = bySlug(sel.value);
    const adults = Math.max(1, +$("#bk-adults").value || 1);
    const children = Math.max(0, +$("#bk-children").value || 0);
    if (!tour) {
      $("#summary-card").style.opacity = .45;
      summary.title.textContent = t("bk.choose");
      summary.rows.innerHTML = "";
      summary.total.textContent = "—";
      summary.img.src = "assets/logo/logo.jpg";
      return;
    }
    $("#summary-card").style.opacity = 1;
    summary.img.src = tour.images[0];
    summary.title.textContent = tt(tour, "title");
    const childPrice = Math.round(tour.price * 0.7);
    const total = adults * tour.price + children * childPrice;
    summary.rows.innerHTML = `
      <div><span>${esc(t("bk.sum.adults"))} × ${adults}</span><span>${money(adults * tour.price)}</span></div>
      ${children ? `<div><span>${esc(t("bk.sum.children"))} × ${children}</span><span>${money(children * childPrice)}</span></div>` : ""}`;
    summary.total.textContent = money(total);
  };
  ["change", "input"].forEach((ev) => form.addEventListener(ev, refreshSummary));
  refreshSummary();

  const setErr = (id, msg) => {
    const field = $("#" + id).closest(".form-field");
    field.classList.toggle("is-bad", !!msg);
    $(".err", field).textContent = msg || "";
  };

  const validate = () => {
    let ok = true;
    const req = { "bk-tour": "bk.err.req", "bk-date": "bk.err.req", "bk-name": "bk.err.req", "bk-email": "bk.err.req", "bk-phone": "bk.err.req" };
    Object.entries(req).forEach(([id, key]) => {
      const v = $("#" + id).value.trim();
      setErr(id, v ? "" : t(key));
      if (!v) ok = false;
    });
    const email = $("#bk-email").value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr("bk-email", t("bk.err.email")); ok = false; }
    const d = dateInput.value;
    if (d && d < tomorrow) { setErr("bk-date", t("bk.err.date")); ok = false; }
    return ok;
  };

  const buildMessage = () => {
    const tour = bySlug(sel.value);
    const adults = $("#bk-adults").value, children = $("#bk-children").value || "0";
    const L = [
      "🌙 *Moon Valley Tours — Booking Request*", "",
      `*Tour:* ${tt(tour, "title")} (${tour.cityName.en})`,
      `*Date:* ${dateInput.value}`,
      `*Adults:* ${adults} · *Children (3–7):* ${children}`,
      `*Name:* ${$("#bk-name").value.trim()}`,
      `*Email:* ${$("#bk-email").value.trim()}`,
      `*Phone:* ${$("#bk-phone").value.trim()}`,
    ];
    const hotel = $("#bk-hotel").value.trim();
    const notes = $("#bk-notes").value.trim();
    if (hotel) L.push(`*Hotel:* ${hotel}`);
    if (notes) L.push(`*Notes:* ${notes}`);
    L.push("", `*Estimated total:* ${$("#sum-total").textContent}`);
    return L.join("\n");
  };

  const finish = () => {
    $("#booking-form-wrap").hidden = true;
    $("#booking-ok").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(waLink(buildMessage()), "_blank", "noopener");
    finish();
  });

  $("#bk-email-send").addEventListener("click", () => {
    if (!validate()) return;
    const subject = "Booking request — " + tt(bySlug(sel.value), "title");
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage().replace(/\*/g, ""))}`;
    finish();
  });

  $("#bk-again").addEventListener("click", () => {
    $("#booking-form-wrap").hidden = false;
    $("#booking-ok").hidden = true;
    form.reset();
    fillSelect();
    refreshSummary();
  });

  document.addEventListener("mv:lang", () => { fillSelect(); refreshSummary(); });
}

/* --------------------------------------------------------------------------
 * 13. Page: GALLERY (filters + lightbox)
 * ------------------------------------------------------------------------ */
function initGallery() {
  const grid = $("#gallery-grid");
  const chips = $("#gallery-chips");
  let dest = "";

  // Build photo list: every tour image, captioned with its tour
  const photos = [];
  TOURS.forEach((tour) => tour.images.forEach((src) => photos.push({ src, tour })));

  const renderChips = () => {
    chips.innerHTML = `<button class="chip ${dest ? "" : "is-on"}" data-d="">${esc(t("tours.all"))}</button>` +
      DESTS.map((d) => `<button class="chip ${dest === d.slug ? "is-on" : ""}" data-d="${esc(d.slug)}">${esc(destName(d))}</button>`).join("");
  };

  let current = [];
  const render = () => {
    renderChips();
    current = photos.filter((p) => !dest || p.tour.citySlug === dest);
    grid.innerHTML = current.map((p, i) => `
      <figure class="gallery-item" data-i="${i}">
        <img src="${esc(p.src)}" alt="${esc(tt(p.tour, "title"))}" loading="lazy" width="480" height="360">
        <figcaption>${esc(tt(p.tour, "title"))}</figcaption>
      </figure>`).join("");
  };
  render();

  chips.addEventListener("click", (e) => {
    const c = e.target.closest(".chip");
    if (c) { dest = c.dataset.d; render(); }
  });

  // Lightbox
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lb-close" aria-label="Close">✕</button>
    <button class="lb-prev" aria-label="Previous">‹</button>
    <img alt="">
    <button class="lb-next" aria-label="Next">›</button>
    <div class="lightbox__caption"></div>`;
  document.body.appendChild(lb);
  let li = 0;
  const show = (i) => {
    li = (i + current.length) % current.length;
    $("img", lb).src = current[li].src;
    $(".lightbox__caption", lb).textContent =
      tt(current[li].tour, "title") + " — " + (current[li].tour.cityName[getLang()] || current[li].tour.cityName.en);
  };
  grid.addEventListener("click", (e) => {
    const f = e.target.closest(".gallery-item");
    if (!f) return;
    show(+f.dataset.i);
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
  const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; };
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-prev", lb).addEventListener("click", () => show(li - 1));
  $(".lb-next", lb).addEventListener("click", () => show(li + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(li - 1);
    if (e.key === "ArrowRight") show(li + 1);
  });

  document.addEventListener("mv:lang", render);
}

/* --------------------------------------------------------------------------
 * 14. Page: CONTACT
 * ------------------------------------------------------------------------ */
function initContact() {
  // Wire dynamic contact links from CONFIG
  const waBtn = $("#contact-wa");
  if (waBtn) { waBtn.href = waLink(t("wa.msg")); document.addEventListener("mv:lang", () => { waBtn.href = waLink(t("wa.msg")); }); }
  const mail = $("#contact-email"); if (mail) { mail.href = "mailto:" + CONFIG.email; mail.textContent = CONFIG.email; }
  const phone = $("#contact-phone"); if (phone) { phone.href = "tel:" + CONFIG.phone.replace(/\s/g, ""); phone.textContent = CONFIG.phone; }
  const map = $("#map-frame"); if (map) map.src = CONFIG.mapsEmbed;
}

/* --------------------------------------------------------------------------
 * 15. Boot
 * ------------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initShell();
  // Presence-based init so the same script powers both the multi-page site
  // and single-file-version.html (which contains several sections at once).
  if ($("#hero-search") || $("#dest-grid")) initHome();
  if ($("#tour-search") && $("#tour-grid")) initPrograms();
  if ($("#price-rows")) initPrices();
  if ($("#booking-form")) initBooking();
  if ($("#gallery-grid")) initGallery();
  if ($("#contact-email")) initContact();
});
