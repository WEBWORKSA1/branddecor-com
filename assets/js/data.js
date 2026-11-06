/* BrandDecor.com — content data. Add entries here and every page that reads them updates automatically. */
var BD = window.BD = window.BD || {};

/* Style Lab recipes: name, tags (space types), palette (5 hex), materials, best for, budget tier */
BD.styles = [
 {n:"Warm Minimal",t:["office","retail"],p:["#f4efe7","#d9cbb6","#a68a64","#3d3a35","#b4532a"],m:"Oak slats, matte plaster, brushed brass letters",b:"Law, finance and consulting receptions that want calm authority",c:"$$"},
 {n:"Industrial Loft",t:["office","restaurant"],p:["#2e2c2a","#5a5652","#9a8f84","#c9b79c","#d9822b"],m:"Exposed brick, black steel channel letters, Edison lighting",b:"Agencies, breweries and coworking spaces",c:"$$"},
 {n:"Nordic Calm",t:["office","home"],p:["#fafaf7","#e5e4de","#b9c2bb","#6d7f75","#2c3a33"],m:"Birch ply, felt acoustic panels, frosted film",b:"Tech teams and wellness studios",c:"$"},
 {n:"Bold Pop",t:["retail","event"],p:["#ffd23f","#ee4266","#540d6e","#3bceac","#0ead69"],m:"Printed vinyl supergraphics, acrylic cut-outs, neon flex",b:"Youth brands, pop-ups and play spaces",c:"$"},
 {n:"Biophilic Green",t:["office","restaurant","home"],p:["#eef3ea","#b5c99a","#718355","#3a5a40","#2b2d42"],m:"Preserved moss logo, timber, planter walls",b:"Sustainability-led brands and hospitality",c:"$$$"},
 {n:"Luxury Noir",t:["retail","restaurant"],p:["#0d0d0d","#262626","#8c7851","#c8a96a","#efe6d2"],m:"Black marble, halo-lit gold letters, velvet",b:"Jewellery, fashion and cocktail bars",c:"$$$"},
 {n:"Coastal Fresh",t:["retail","home","restaurant"],p:["#f7fbfc","#d6e6f2","#a9c4d6","#4a7c99","#e8b86d"],m:"Whitewashed wood, rope details, printed wallcovering",b:"Cafés, surf and resort retail",c:"$"},
 {n:"Retro 70s",t:["restaurant","retail","event"],p:["#f2e3c6","#e9a23b","#c8553d","#6b4226","#2f5d50"],m:"Rounded supergraphics, cork, terrazzo vinyl",b:"Diners, record shops and creative studios",c:"$"},
 {n:"Corporate Navy",t:["office","event"],p:["#f5f7fa","#c9d3e0","#5b7aa6","#1f3a64","#c9a227"],m:"Brushed aluminium standoff panels, glass manifestation",b:"Enterprise HQs and trade-show islands",c:"$$"},
 {n:"Japandi",t:["office","home","retail"],p:["#f3eee6","#d8cbb8","#9e8d78","#4d4a44","#7a8a6a"],m:"Ash timber, washi-style film, low-gloss paint",b:"Design studios and boutique retail",c:"$$"},
 {n:"Neon Night",t:["event","restaurant","retail"],p:["#0b0c1a","#1f1d3a","#ff3cac","#2b86c5","#00f5d4"],m:"LED neon flex, mirror acrylic, dark matte walls",b:"Bars, gaming lounges and launch parties",c:"$$"},
 {n:"Heritage Craft",t:["restaurant","retail"],p:["#f4ede1","#cdb592","#8b6b43","#4b3a2a","#7c2e2e"],m:"Hand-painted signwriting, enamel plaques, reclaimed wood",b:"Bakeries, barbers and family businesses",c:"$$"},
 {n:"Tech Gradient",t:["office","event"],p:["#0f1226","#3a0ca3","#7209b7","#f72585","#4cc9f0"],m:"Printed gradient wallcovering, backlit fabric, LED strips",b:"SaaS offices and conference stages",c:"$$"},
 {n:"Clinic Clean",t:["office"],p:["#ffffff","#eef4f6","#a7d0d6","#2f8f9d","#1f3b4d"],m:"Antimicrobial wall vinyl, frosted privacy film, clear wayfinding",b:"Dental, medical and veterinary clinics",c:"$"},
 {n:"Terracotta Sun",t:["restaurant","home","retail"],p:["#fbf3ea","#f0c9a6","#d9895b","#b4532a","#4f3a2c"],m:"Limewash, arched cut-outs, ceramic tile logo",b:"Mediterranean dining and lifestyle shops",c:"$$"},
 {n:"Monochrome Graphic",t:["office","retail","event"],p:["#ffffff","#d4d4d4","#8a8a8a","#2b2b2b","#000000"],m:"Large-format black vinyl typography, white acrylic",b:"Architecture firms and galleries",c:"$"},
 {n:"Kids Play",t:["retail","event"],p:["#fff8e7","#ffcf56","#ff8c42","#4ecdc4","#5f4bb6"],m:"Rounded foam shapes, washable wall vinyl, floor graphics",b:"Learning centres and family entertainment",c:"$"},
 {n:"Desert Modern",t:["home","office","retail"],p:["#f6efe6","#e3cdb3","#c49a6c","#8c6a4f","#4d5b46"],m:"Plaster texture, cactus-green accents, cut-steel logo",b:"Boutique hotels and wellness brands",c:"$$"},
 {n:"Art Deco Revival",t:["restaurant","event","retail"],p:["#101820","#1e3d3a","#c9a96e","#e8dcc2","#7a1f2b"],m:"Fluted panels, gold leaf letters, geometric floor vinyl",b:"Hotels, salons and gala events",c:"$$$"},
 {n:"Sport Energy",t:["office","event","retail"],p:["#111111","#e10600","#ffffff","#9b9b9b","#ffcc00"],m:"Motion-blur wall wraps, rubber flooring decals, LED tickers",b:"Gyms, sports bars and fan zones",c:"$$"},
 {n:"Soft Pastel",t:["retail","home","restaurant"],p:["#fff5f7","#ffd6e0","#c3e6e2","#b8b5ff","#6d6875"],m:"Rounded acrylic, frosted pastel film, light oak",b:"Beauty bars, dessert shops and creators",c:"$"},
 {n:"Eco Raw",t:["office","event","retail"],p:["#efe9df","#cbbfa8","#8f8a6e","#5d6046","#2f2d26"],m:"Cardboard honeycomb, cork, water-based inks",b:"Low-waste booths and sustainable brands",c:"$"},
 {n:"Creator Studio",t:["home","office"],p:["#121212","#2a2a2a","#ff5d73","#ffd166","#06d6a0"],m:"Acoustic foam in brand colours, neon logo, shelf props",b:"YouTube, podcast and stream backdrops",c:"$"},
 {n:"Hospitality Classic",t:["restaurant","event"],p:["#faf6ef","#e7d8c1","#a3825c","#5e4632","#25332b"],m:"Panelled walls, engraved brass, printed menus as art",b:"Hotels, restaurants and wedding venues",c:"$$$"}
];

/* Idea of the Day: one shows per calendar day, rotating automatically */
BD.ideas = [
 "Put your mission statement on the wall people see when they leave a meeting, not when they arrive — that's when it sticks.",
 "Frosted glass film with a 15–20% logo pattern gives privacy and brand presence at a fraction of the cost of etched glass.",
 "Light your logo wall from above at a 30° angle — halo or wash lighting doubles perceived quality.",
 "Floor decals are the cheapest wayfinding upgrade: arrows plus brand colour cut 'where is…?' questions.",
 "Repeat one brand colour in three places in a room — wall, object, textile — and the space reads as designed.",
 "Measure your reception wall from the entry door. Size the logo so its cap height is about 1 inch per 10 feet of distance.",
 "A values wall works best as five or fewer short statements. Seven-plus becomes wallpaper.",
 "Swap a static window poster for removable static-cling vinyl and update the message every season.",
 "Trade-show rule: your headline should read from the aisle in three seconds. Seven words or fewer.",
 "Brand your Zoom background wall: a 6×8 ft printed fabric backdrop behind a desk is a daily brand impression.",
 "Use matte laminate on wall graphics near windows — gloss creates glare that hides the message.",
 "A timeline wall of company milestones is a recruiting tool. Put it where candidates wait.",
 "Restaurants: put the logo on the one wall that appears in customer photos. Look at your tagged posts to find it.",
 "Choose acrylic standoffs over vinyl for anything clients touch — fingerprints don't show on the panel face.",
 "Moss or plant logos need zero watering if preserved, and read as premium in hospitality.",
 "Paint is the cheapest brand colour. Use it on one feature wall and let graphics do the rest.",
 "Install wall graphics 7–10 days after fresh paint has cured or the adhesive can lift paint later.",
 "Retail: the first 5–15 feet inside the door is the decompression zone. Keep branded displays just beyond it.",
 "Neon-style LED flex uses far less power than glass neon and survives a move — ideal for leased spaces.",
 "Put your Wi-Fi password on a branded sign. It's the most photographed sign in any café.",
 "For booths, spend on the back wall and lighting first, flooring second, furniture last.",
 "Dimensional letters at 1/2 inch thick read as signage; at 1 inch or more they read as architecture.",
 "Branded stair risers turn a dead staircase into a vertical billboard for under the price of one sign.",
 "Pick a brand pattern (a shape from your logo) and use it at 5% opacity on glass, walls and packaging.",
 "Lobby screens: show customer stories, not ads. Dwell time goes up when it's about people.",
 "Wayfinding test: hand a stranger a destination and watch where they hesitate. Put a sign there.",
 "A branded photo-op wall at events generates free social reach. Make it 8 ft wide so groups fit.",
 "Use the same typeface on signage as on your website — consistency is the cheapest premium signal.",
 "Measure twice for murals: plan seams away from faces, logos and outlet covers.",
 "Leased office? Choose removable wallcovering and magnetic or rail systems so branding moves with you.",
 "End every branding project with a photo shoot of the space — it becomes website, hiring and social content."
];

/* Seasonal campaign planner: month index -> campaign. Auto-selects current and next month. */
BD.seasons = [
 {m:"January",c:"New-year refresh",i:"Swap window graphics to a 'fresh start' message; refresh values wall; audit worn signage after the holidays."},
 {m:"February",c:"Valentine's & love-local",i:"Removable heart motifs on glass, photo-op corner, 'made with love' menu boards."},
 {m:"March",c:"Spring launch",i:"Pastel window cling, plant-forward displays, new-product feature table at the decompression edge."},
 {m:"April",c:"Earth Month",i:"Showcase recycled materials, cork and cardboard displays, sustainability timeline wall."},
 {m:"May",c:"Graduation & Mother's Day",i:"Gift-guide endcaps, celebratory balloon-free photo walls, appointment-booking QR signs."},
 {m:"June",c:"Summer & Pride",i:"Bright supergraphics, patio and sidewalk A-frames, inclusive welcome decals."},
 {m:"July",c:"Mid-year sale",i:"Bold sale banners with expiry dates, floor arrows to clearance, trade-show season prep."},
 {m:"August",c:"Back to school / office",i:"Desk-zone wayfinding, team-welcome walls, onboarding branding for returning staff."},
 {m:"September",c:"Fall trade-show season",i:"Booth graphics refresh, lead-capture kiosks, portable backdrops and table throws."},
 {m:"October",c:"Halloween & harvest",i:"Removable seasonal window art, warm lighting scenes, themed photo ops."},
 {m:"November",c:"Black Friday & gratitude",i:"Hero window, countdown signage, queue-line branding, thank-you wall for customers."},
 {m:"December",c:"Holiday & year-end",i:"Branded gift-wrap stations, light installations, year-in-review timeline for staff parties."}
];

/* Directory categories */
BD.pros = [
 {k:"signs",n:"Sign makers & fabricators",d:"Dimensional letters, channel letters, monument and pylon signs, ADA signage."},
 {k:"graphics",n:"Wall graphics & mural installers",d:"Printed wallcovering, vinyl murals, hand-painted murals, floor and stair graphics."},
 {k:"glass",n:"Window & glass film",d:"Frosted manifestation, privacy film, storefront vinyl, solar and safety films."},
 {k:"exhibits",n:"Trade-show & exhibit builders",d:"Rental and custom booths, fabric backlit walls, portable displays, event branding."},
 {k:"interiors",n:"Interior & retail designers",d:"Branded interiors, visual merchandising, store fixtures, hospitality fit-out."},
 {k:"wayfinding",n:"Wayfinding consultants",d:"Signage systems, campus and hospital navigation, accessibility audits."},
 {k:"digital",n:"Digital signage & LED",d:"Lobby screens, video walls, LED neon, content management."},
 {k:"print",n:"Large-format print shops",d:"Banners, fabric prints, foam board, canvas, posters, short-run event graphics."}
];
