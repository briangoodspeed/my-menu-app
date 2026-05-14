"use client";
import { useState, useEffect, useRef } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  studio:   { id:"studio",   name:"Studio",            emoji:"◻", desc:"Modern & clean",               bg:"#ffffff", bg2:"#f5f7fa", text:"#0a0a0a", text2:"#6b7280", border:"#e5e7eb", card:"#ffffff", accent:"#2563eb", accentLight:"#eff6ff", accentText:"#fff", navBg:"#ffffff", heroOverlay:"linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 55%,transparent 100%)", btnRadius:8,  cardRadius:12, tagRadius:6,  shadow:"0 1px 8px rgba(0,0,0,0.06)", recommended:["Inter","Raleway"] },
  cozy:     { id:"cozy",     name:"Warm & Cozy",       emoji:"🍂", desc:"Family restaurant warmth",      bg:"#fdf8f3", bg2:"#f5ede2", text:"#3d2b1f", text2:"#8b6b55", border:"#e8d5c0", card:"#fff9f5", accent:"#c0622a", accentLight:"#fdf0e8", accentText:"#fff", navBg:"#fdf8f3", heroOverlay:"linear-gradient(to top,rgba(61,43,31,0.88) 0%,rgba(61,43,31,0.25) 55%,transparent 100%)", btnRadius:24, cardRadius:20, tagRadius:20, shadow:"0 4px 20px rgba(192,98,42,0.1)", recommended:["Lora","Playfair Display","Nunito"] },
  dark:     { id:"dark",     name:"Dark & Moody",      emoji:"🖤", desc:"Bars, speakeasies, fine dining", bg:"#0e0e0e", bg2:"#1a1a1a", text:"#f0e8d8", text2:"#8a7d6a", border:"#2a2a2a", card:"#1a1a1a", accent:"#c9a84c", accentLight:"#1e1a10", accentText:"#0e0e0e", navBg:"#0e0e0e", heroOverlay:"linear-gradient(to top,rgba(14,14,14,0.94) 0%,rgba(14,14,14,0.3) 55%,transparent 100%)", btnRadius:4,  cardRadius:8,  tagRadius:4,  shadow:"0 4px 30px rgba(201,168,76,0.06)", recommended:["Cormorant Garamond","Raleway"] },
  fresh:    { id:"fresh",    name:"Fresh & Vibrant",   emoji:"🌿", desc:"Cafes, healthy spots, brunch",   bg:"#f9fffe", bg2:"#f0faf6", text:"#0d2b1e", text2:"#4a7c65", border:"#d4ede3", card:"#ffffff", accent:"#1a9e6e", accentLight:"#e6f7f1", accentText:"#fff", navBg:"#ffffff", heroOverlay:"linear-gradient(to top,rgba(13,43,30,0.88) 0%,rgba(13,43,30,0.2) 55%,transparent 100%)", btnRadius:14, cardRadius:16, tagRadius:10, shadow:"0 4px 20px rgba(26,158,110,0.08)", recommended:["DM Sans","Poppins"] },
  festive:  { id:"festive",  name:"Festive & Cultural",emoji:"🪔", desc:"Indian, Mexican, Middle Eastern",bg:"#1a0a00", bg2:"#2d1500", text:"#fef3e2", text2:"#c49a6c", border:"#3d2000", card:"#221000", accent:"#e8a020", accentLight:"#2d1a00", accentText:"#1a0a00", navBg:"#1a0a00", heroOverlay:"linear-gradient(to top,rgba(26,10,0,0.92) 0%,rgba(26,10,0,0.3) 55%,transparent 100%)", btnRadius:4,  cardRadius:10, tagRadius:4,  shadow:"0 4px 20px rgba(232,160,32,0.1)", recommended:["Playfair Display","Source Sans Pro"] },
  cloud:    { id:"cloud",    name:"Cloud",             emoji:"☁", desc:"Dessert spots, bubble tea",      bg:"#fdf5ff", bg2:"#f5e8ff", text:"#2d1b3d", text2:"#9b6db5", border:"#e8d0f5", card:"#fff9ff", accent:"#9333ea", accentLight:"#f3e8ff", accentText:"#fff", navBg:"#fdf5ff", heroOverlay:"linear-gradient(to top,rgba(45,27,61,0.88) 0%,rgba(45,27,61,0.2) 55%,transparent 100%)", btnRadius:28, cardRadius:24, tagRadius:24, shadow:"0 4px 20px rgba(147,51,234,0.08)", recommended:["Poppins","Nunito","Quicksand"] },
  white:    { id:"white",    name:"Pure White",        emoji:"⬜", desc:"Ultra minimal, clean slate",    bg:"#ffffff", bg2:"#fafafa", text:"#111111", text2:"#888888", border:"#eeeeee", card:"#ffffff", accent:"#111111", accentLight:"#f5f5f5", accentText:"#ffffff", navBg:"#ffffff", heroOverlay:"linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)", btnRadius:2,  cardRadius:6,  tagRadius:4,  shadow:"0 1px 4px rgba(0,0,0,0.06)", recommended:["Inter","Raleway"] },
  black:    { id:"black",    name:"Pure Black",        emoji:"⬛", desc:"Maximum contrast, bold",         bg:"#000000", bg2:"#111111", text:"#ffffff", text2:"#888888", border:"#222222", card:"#111111", accent:"#ffffff", accentLight:"#1a1a1a", accentText:"#000000", navBg:"#000000", heroOverlay:"linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)", btnRadius:2,  cardRadius:6,  tagRadius:4,  shadow:"0 2px 12px rgba(255,255,255,0.04)", recommended:["Raleway","Cormorant Garamond"] },
  grey:     { id:"grey",     name:"Light Grey",        emoji:"🔲", desc:"Soft neutral, works anywhere",  bg:"#f4f4f4", bg2:"#ebebeb", text:"#1a1a1a", text2:"#777777", border:"#d8d8d8", card:"#ffffff", accent:"#444444", accentLight:"#e8e8e8", accentText:"#ffffff", navBg:"#f4f4f4", heroOverlay:"linear-gradient(to top,rgba(26,26,26,0.85) 0%,transparent 60%)", btnRadius:6,  cardRadius:10, tagRadius:6,  shadow:"0 1px 6px rgba(0,0,0,0.08)", recommended:["Inter","DM Sans"] },
};

// ─── FONTS ────────────────────────────────────────────────────────────────────
const FONTS = [
  { id:"Inter",               name:"Inter",               family:"'Inter',sans-serif",                  desc:"Modern, clean, highly readable",        recommended:["studio"] },
  { id:"DM Sans",             name:"DM Sans",             family:"'DM Sans',sans-serif",                desc:"Friendly modern, slightly warmer",       recommended:["fresh"] },
  { id:"Poppins",             name:"Poppins",             family:"'Poppins',sans-serif",                desc:"Rounded, energetic, very versatile",     recommended:["fresh","cloud"] },
  { id:"Playfair Display",    name:"Playfair Display",    family:"'Playfair Display',serif",            desc:"Elegant serif, editorial feel",          recommended:["festive","cozy"] },
  { id:"Lora",                name:"Lora",                family:"'Lora',serif",                        desc:"Warm literary serif",                    recommended:["cozy"] },
  { id:"Cormorant Garamond",  name:"Cormorant Garamond",  family:"'Cormorant Garamond',serif",          desc:"Dramatic, high fashion",                 recommended:["dark"] },
  { id:"Raleway",             name:"Raleway",             family:"'Raleway',sans-serif",                desc:"Sleek geometric, modern",                recommended:["dark","studio"] },
  { id:"Nunito",              name:"Nunito",              family:"'Nunito',sans-serif",                  desc:"Soft rounded, gentle feel",              recommended:["cloud","cozy"] },
  { id:"Quicksand",           name:"Quicksand",           family:"'Quicksand',sans-serif",              desc:"Whimsical, rounded, fun",                recommended:["cloud"] },
  { id:"Source Sans Pro",     name:"Source Sans Pro",     family:"'Source Sans 3',sans-serif",          desc:"Clean neutral, works universally",       recommended:["festive"] },
];

const P = {
  wagyu_smash:   "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
  ember_classic: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
  mushroom_sw:   "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80",
  crispy_chk:    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80",
  vegan_bb:      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&q=80",
  truffle_royal: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80",
  truffle_fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  wings:         "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500&q=80",
  burrata:       "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=500&q=80",
  shrimp:        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80",
  nachos:        "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&q=80",
  soup:          "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80",
  bruschetta:    "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&q=80",
  calamari:      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
  salmon:        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
  steak:         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  butter_chk:    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80",
  risotto:       "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80",
  sea_bass:      "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80",
  lamb:          "https://images.unsplash.com/photo-1514516816566-de580c621376?w=500&q=80",
  prawn_ling:    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80",
  truffle_pasta: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500&q=80",
  chk_supreme:   "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=500&q=80",
  duck:          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
  vegan_stir:    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  schnitzel:     "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&q=80",
  margherita:    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
  nduja:         "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
  bbq_pizza:     "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500&q=80",
  truffle_piz:   "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
  four_cheese:   "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=500&q=80",
  mortadella:    "https://images.unsplash.com/photo-1600628421060-9eccbc698cca?w=500&q=80",
  caesar:        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&q=80",
  poke:          "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=500&q=80",
  teriyaki:      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80",
  falafel:       "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=500&q=80",
  korean:        "https://images.unsplash.com/photo-1562802378-063ec186a863?w=500&q=80",
  acai:          "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&q=80",
  buddha:        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  lava:          "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80",
  cheesecake:    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80",
  creme_brulee:  "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=500&q=80",
  tiramisu:      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80",
  sorbet:        "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=500&q=80",
  sticky_toff:   "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80",
  macaron:       "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=500&q=80",
  waffle:        "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&q=80",
  espresso_m:    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80",
  smoke_ember:   "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80",
  mojito:        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80",
  lemonade:      "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500&q=80",
  matcha:        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
  negroni:       "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=500&q=80",
  smoothie:      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500&q=80",
  // sides
  house_fries:   "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  sweet_pot:     "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&q=80",
  onion_rings:   "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80",
  coleslaw:      "https://images.unsplash.com/photo-1607116667981-ff148a4b6abb?w=500&q=80",
  mash:          "https://images.unsplash.com/photo-1585325701165-53cf2e2d4c92?w=500&q=80",
  mac_cheese:    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=500&q=80",
  truffle_fries2:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=80",
  side_salad:    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
  garlic_bread2: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=500&q=80",
  corn:          "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&q=80",
  seasonal_veg:  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80",
  dauphinoise:   "https://images.unsplash.com/photo-1585325701165-53cf2e2d4c92?w=500&q=80",
};

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES_DEF = [
  { id:"popular",  name:"Popular",   img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80", color:"#e84c3d" },
  { id:"starters", name:"Starters",  img:"https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&q=80", color:"#7c5cbf" },
  { id:"mains",    name:"Mains",     img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80",    color:"#d4730a" },
  { id:"pizza",    name:"Pizza",     img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80", color:"#2563eb" },
  { id:"burgers",  name:"Burgers",   img:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80",   color:"#6d28d9" },
  { id:"bowls",    name:"Bowls",     img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80", color:"#0891b2" },
  { id:"sides",    name:"Sides",     img:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80", color:"#b45309" },
  { id:"desserts", name:"Desserts",  img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80", color:"#db2777" },
  { id:"drinks",   name:"Drinks",    img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&q=80",   color:"#059669" },
];

const TAG_STYLE = {
  "Vegetarian":  {bg:"#dcfce7",color:"#166534"},
  "Vegan":       {bg:"#f0fdf4",color:"#15803d"},
  "Gluten Free": {bg:"#dbeafe",color:"#1d4ed8"},
  "High Protein":{bg:"#fff7ed",color:"#c2410c"},
  "Spicy":       {bg:"#fee2e2",color:"#b91c1c"},
  "Dairy Free":  {bg:"#faf5ff",color:"#7e22ce"},
  "Nut Free":    {bg:"#fefce8",color:"#a16207"},
  "Keto":        {bg:"#f0f9ff",color:"#0369a1"},
  "Halal":       {bg:"#f0fdf4",color:"#166534"},
  "New":         {bg:"#fff7ed",color:"#ea580c"},
  "Seasonal":    {bg:"#fdf4ff",color:"#a21caf"},
  "Chef's Pick": {bg:"#fef9c3",color:"#92400e"},
};

const SPICE_ICON = (level: string) => {
  const icons: Record<string, string> = { "Mild":"🌶", "Medium":"🌶 x2", "Hot":"🌶 x3", "Extra Hot":"🌶 x4" };
  return icons[level] || null;
};

// ─── FULL DISH DATABASE ───────────────────────────────────────────────────────
// tags includes dietary, spice (as "Mild"|"Medium"|"Hot"|"Extra Hot"), and flags
// priceRange auto-derived; spiceLevel stored in spice field
const RAW_DISHES = [
  // ── BURGERS ──────────────────────────────────────────────────────
  {id:1,  name:"Wagyu Smash Burger",   price:19.99, cat:["popular","burgers"], img:P.wagyu_smash,  desc:"Double wagyu smash patties, aged cheddar, house pickles, ember sauce, brioche bun.",           tags:["High Protein","Halal"],            spice:null,     popular:true,  rating:4.9,reviews:341,cal:820,weight:"280g", extras:[{name:"Bacon",price:2.5},{name:"Extra Patty",price:4}], sides:[{name:"House Fries",price:0,premium:false},{name:"Sweet Potato Fries",price:2,premium:true},{name:"Side Salad",price:0,premium:false},{name:"Onion Rings",price:2.5,premium:true},{name:"Coleslaw",price:0,premium:false},{name:"Truffle Fries",price:3,premium:true}], flags:["Popular"]},
  {id:2,  name:"The Ember Classic",    price:16.99, cat:["burgers"],           img:P.ember_classic,desc:"100% chuck beef patty, aged cheddar, house pickles, ember sauce, butter-toasted brioche.",    tags:["High Protein","Halal"],            spice:null,     popular:false, rating:4.8,reviews:203,cal:690,weight:"220g", extras:[{name:"Cheese",price:1},{name:"Bacon",price:2.5}],     sides:[{name:"House Fries",price:0,premium:false},{name:"Sweet Potato Fries",price:2,premium:true},{name:"Side Salad",price:0,premium:false},{name:"Onion Rings",price:2.5,premium:true},{name:"Coleslaw",price:0,premium:false}], flags:[]},
  {id:3,  name:"Mushroom & Swiss",     price:17.99, cat:["burgers"],           img:P.mushroom_sw,  desc:"Beef patty, wild mushrooms, swiss gruyère, whole-grain aioli, rocket, pretzel bun.",          tags:["High Protein"],                   spice:null,     popular:false, rating:4.6,reviews:122,cal:760,weight:"260g", extras:[{name:"Truffle Mayo",price:1.5}],                      sides:[{name:"House Fries",price:0,premium:false},{name:"Sweet Potato Fries",price:2,premium:true},{name:"Side Salad",price:0,premium:false},{name:"Truffle Fries",price:3,premium:true}], flags:[]},
  {id:4,  name:"Crispy Chicken",       price:16.99, cat:["burgers"],           img:P.crispy_chk,   desc:"Buttermilk fried chicken thigh, kimchi slaw, pickles, hot honey, gochujang mayo, brioche.",   tags:["High Protein","Halal"],            spice:"Hot",    popular:true,  rating:4.8,reviews:196,cal:740,weight:"270g", extras:[{name:"Extra Hot Sauce",price:0.5}],                   sides:[{name:"House Fries",price:0,premium:false},{name:"Sweet Potato Fries",price:2,premium:true},{name:"Coleslaw",price:0,premium:false},{name:"Onion Rings",price:2.5,premium:true}], flags:["Popular"]},
  {id:5,  name:"Vegan Black Bean",     price:15.99, cat:["burgers"],           img:P.vegan_bb,     desc:"Smoky black bean patty, guacamole, pickled red onion, vegan sriracha mayo, lettuce.",         tags:["Vegan","Vegetarian","Dairy Free","Nut Free","Gluten Free"], spice:"Medium", popular:false, rating:4.4,reviews:89, cal:520,weight:"230g", extras:[{name:"Extra Avocado",price:2}],  flags:["New"]},
  {id:6,  name:"Truffle Royale",       price:22.99, cat:["burgers"],           img:P.truffle_royal,desc:"Wagyu patty, black truffle mayo, brie, caramelised onions, rocket, gold-dusted brioche.",     tags:["High Protein"],                   spice:null,     popular:false, rating:4.9,reviews:87, cal:880,weight:"290g", extras:[{name:"Truffle Shavings",price:4}],                    flags:["Chef's Pick"]},

  // ── STARTERS ─────────────────────────────────────────────────────
  {id:7,  name:"Truffle Fries",        price:9.99,  cat:["popular","starters"],img:P.truffle_fries,desc:"Crispy hand-cut fries, truffle oil, aged parmesan, fresh chives, house aioli.",              tags:["Vegetarian","Gluten Free","Nut Free"], spice:null,  popular:true,  rating:4.8,reviews:512,cal:420,weight:"200g", extras:[{name:"Extra Aioli",price:1}],                        flags:["Popular"]},
  {id:8,  name:"Crispy Wings",         price:14.99, cat:["popular","starters"],img:P.wings,        desc:"Dry-rub chicken wings, buffalo glaze, blue cheese dip, celery, pickled jalapeños.",          tags:["High Protein","Gluten Free","Halal"],spice:"Hot",    popular:true,  rating:4.7,reviews:187,cal:560,weight:"300g", extras:[{name:"Extra Sauce",price:1}],                        flags:["Popular"]},
  {id:9,  name:"Burrata Toast",        price:13.99, cat:["starters"],          img:P.burrata,      desc:"Whipped burrata, heirloom tomatoes, basil oil, fleur de sel, toasted sourdough.",            tags:["Vegetarian"],                     spice:null,     popular:false, rating:4.8,reviews:156,cal:390,weight:"220g", extras:[{name:"Prosciutto",price:3}],                          flags:["Seasonal"]},
  {id:10, name:"Shrimp Cocktail",      price:14.99, cat:["starters"],          img:P.shrimp,       desc:"Chilled tiger prawns, house-made Marie Rose, micro greens, fresh lemon, horseradish.",       tags:["High Protein","Gluten Free","Dairy Free","Nut Free","Halal"], spice:"Mild", popular:false, rating:4.6,reviews:74, cal:180,weight:"200g", extras:[{name:"Extra Prawns",price:4}], flags:[]},
  {id:11, name:"Nachos Grande",        price:12.99, cat:["starters"],          img:P.nachos,       desc:"Tortilla chips, melted cheddar, guacamole, pico de gallo, jalapeños, sour cream.",          tags:["Vegetarian","Gluten Free"],        spice:"Medium", popular:false, rating:4.6,reviews:163,cal:680,weight:"350g", extras:[{name:"Pulled Chicken",price:3}],                      flags:[]},
  {id:12, name:"Soup of the Day",      price:7.99,  cat:["starters"],          img:P.soup,         desc:"Chef's daily creation, artisan bread roll, herb crème fraîche. Ask your server.",            tags:["Vegetarian","Halal"],              spice:null,     popular:false, rating:4.4,reviews:52, cal:290,weight:"350ml",extras:[{name:"Extra Bread",price:1.5}],                       flags:["Seasonal"]},
  {id:13, name:"Bruschetta Trio",      price:10.99, cat:["starters"],          img:P.bruschetta,   desc:"Three ways: vine tomato basil, whipped ricotta, roasted pepper tapenade on grilled ciabatta.",tags:["Vegetarian","Dairy Free","Nut Free"], spice:null, popular:false, rating:4.5,reviews:88, cal:310,weight:"250g", extras:[],                                                    flags:[]},
  {id:14, name:"Calamari Fritti",      price:12.99, cat:["starters"],          img:P.calamari,     desc:"Lightly battered squid rings, lemon aioli, smoked paprika, fresh herbs.",                   tags:["Dairy Free","Nut Free"],           spice:"Mild",   popular:false, rating:4.5,reviews:81, cal:420,weight:"220g", extras:[{name:"Extra Aioli",price:1}],                        flags:["New"]},

  // ── MAINS ─────────────────────────────────────────────────────────
  {id:15, name:"Grilled Salmon",       price:26.99, cat:["popular","mains"],   img:P.salmon,       desc:"Atlantic salmon, garlic herb butter, roasted baby vegetables, lemon caper beurre blanc.",    tags:["High Protein","Gluten Free","Halal"], spice:null,  popular:true,  rating:4.9,reviews:203,cal:480,weight:"280g", extras:[{name:"Mashed Potato",price:3}], sides:[{name:"Mashed Potato",price:0,premium:false},{name:"Loaded Mash",price:2,premium:true},{name:"Seasonal Veg",price:0,premium:false},{name:"Dauphinoise Potato",price:3,premium:true},{name:"Side Salad",price:0,premium:false}], flags:["Popular"]},
  {id:16, name:"Wagyu Ribeye 400g",    price:58.99, cat:["mains"],             img:P.steak,        desc:"21-day dry-aged A5 wagyu, wood-fired, bone marrow butter, crispy shallots, red wine jus.",  tags:["High Protein","Gluten Free","Keto","Halal"],spice:null, popular:false,rating:5.0,reviews:89, cal:920,weight:"400g", extras:[{name:"Bone Marrow",price:6}], sides:[{name:"House Chips",price:0,premium:false},{name:"Truffle Chips",price:3,premium:true},{name:"Seasonal Veg",price:0,premium:false},{name:"Dauphinoise Potato",price:3,premium:true},{name:"Creamed Spinach",price:0,premium:false},{name:"Mac & Cheese",price:4,premium:true}], flags:["Chef's Pick"]},
  {id:17, name:"Butter Chicken",       price:20.99, cat:["popular","mains"],   img:P.butter_chk,   desc:"Slow-cooked chicken, rich tomato fenugreek sauce, kashmiri chilli, garlic naan, basmati.",   tags:["High Protein","Gluten Free","Halal"],spice:"Medium", popular:true, rating:4.8,reviews:198,cal:640,weight:"350g", extras:[{name:"Extra Naan",price:2},{name:"Rice",price:2}], sides:[{name:"Basmati Rice",price:0,premium:false},{name:"Pilau Rice",price:1.5,premium:true},{name:"Garlic Naan",price:0,premium:false},{name:"Peshwari Naan",price:2,premium:true},{name:"Raita",price:0,premium:false}], flags:["Popular"]},
  {id:18, name:"Mushroom Risotto",     price:19.99, cat:["mains"],             img:P.risotto,      desc:"Wild mushroom & porcini risotto, aged parmesan, truffle oil, fresh thyme.",                  tags:["Vegetarian","Gluten Free","Nut Free"],spice:null,   popular:false, rating:4.6,reviews:112,cal:580,weight:"380g", extras:[{name:"Extra Parmesan",price:1.5}],                   flags:[]},
  {id:19, name:"Sea Bass Miso",        price:28.99, cat:["mains"],             img:P.sea_bass,     desc:"Pan-seared sea bass, white miso glaze, pak choi, edamame, jasmine rice.",                   tags:["High Protein","Gluten Free","Dairy Free","Halal"],spice:null, popular:false,rating:4.8,reviews:94, cal:420,weight:"300g", extras:[{name:"Extra Rice",price:2}],                  flags:["Seasonal"]},
  {id:20, name:"Rack of Lamb",         price:36.99, cat:["mains"],             img:P.lamb,         desc:"Herb-crusted rack of lamb, mint jelly, roasted garlic dauphinoise, seasonal greens.",        tags:["High Protein","Gluten Free","Halal"],spice:null,   popular:false, rating:4.9,reviews:58, cal:820,weight:"400g", extras:[{name:"Extra Chop",price:10}],                        flags:["Seasonal","Chef's Pick"]},
  {id:21, name:"Prawn Linguine",       price:22.99, cat:["mains"],             img:P.prawn_ling,   desc:"King prawns, linguine, chilli, garlic, white wine, cherry tomatoes, parsley.",               tags:["High Protein","Dairy Free","Halal"],spice:"Hot",   popular:false, rating:4.6,reviews:103,cal:590,weight:"360g", extras:[{name:"Extra Prawns",price:5}],                       flags:[]},
  {id:22, name:"Truffle Pasta",        price:19.99, cat:["mains"],             img:P.truffle_pasta,desc:"Hand-rolled tagliatelle, black truffle, aged parmesan, chive oil, crispy pancetta.",         tags:["Vegetarian","Nut Free"],           spice:null,     popular:false, rating:4.7,reviews:128,cal:620,weight:"350g", extras:[{name:"Grilled Chicken",price:4}],                    flags:[]},
  {id:23, name:"Chicken Supreme",      price:21.99, cat:["mains"],             img:P.chk_supreme,  desc:"Corn-fed chicken supreme, roasted garlic mash, wilted spinach, tarragon cream sauce.",       tags:["High Protein","Gluten Free","Halal"],spice:null,   popular:false, rating:4.5,reviews:88, cal:680,weight:"320g", extras:[{name:"Extra Sauce",price:1.5}],                      flags:[]},
  {id:24, name:"Pan-Seared Duck",      price:31.99, cat:["mains"],             img:P.duck,         desc:"Confit duck leg, cherry reduction, roasted root vegetables, dauphinoise potato.",             tags:["Gluten Free","High Protein"],      spice:null,     popular:false, rating:4.7,reviews:67, cal:740,weight:"350g", extras:[{name:"Extra Duck",price:8}],                         flags:["Seasonal","Chef's Pick"]},
  {id:25, name:"Vegan Stir Fry",       price:14.99, cat:["mains"],             img:P.vegan_stir,   desc:"Seasonal vegetables, tofu, ginger soy glaze, sesame seeds, jasmine rice.",                   tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"], spice:"Medium", popular:false,rating:4.3,reviews:79,cal:380,weight:"350g",extras:[{name:"Extra Tofu",price:2}], flags:["New"]},
  {id:26, name:"Chicken Schnitzel",    price:17.99, cat:["mains"],             img:P.schnitzel,    desc:"Breaded chicken breast, lemon caper butter, roasted potatoes, house coleslaw.",              tags:["High Protein","Nut Free","Halal"], spice:null,     popular:false, rating:4.5,reviews:88, cal:680,weight:"320g", extras:[],                                                    flags:[]},

  // ── PIZZA ─────────────────────────────────────────────────────────
  {id:27, name:"Margherita DOP",       price:14.99, cat:["pizza"],             img:P.margherita,   desc:"San Marzano DOP tomato, fior di latte, fresh basil, extra virgin olive oil, sea salt.",      tags:["Vegetarian","Nut Free","Halal"],   spice:null,     popular:false, rating:4.5,reviews:167,cal:720,weight:"350g", extras:[{name:"Burrata",price:3}],                            flags:[]},
  {id:28, name:"Nduja & Honey",        price:17.99, cat:["pizza"],             img:P.nduja,        desc:"Nduja sausage, mozzarella, roasted peppers, wild rocket, acacia honey, chilli flakes.",      tags:["Nut Free"],                        spice:"Hot",    popular:true,  rating:4.8,reviews:214,cal:880,weight:"380g", extras:[{name:"Extra Nduja",price:2.5}],                      flags:["Popular"]},
  {id:29, name:"BBQ Pulled Chicken",   price:17.99, cat:["pizza"],             img:P.bbq_pizza,    desc:"Smoky BBQ base, pulled chicken thigh, caramelised onion, mozzarella, fresh coriander.",      tags:["High Protein","Nut Free","Halal"], spice:"Mild",   popular:false, rating:4.6,reviews:143,cal:860,weight:"370g", extras:[{name:"Extra Chicken",price:3}],                      flags:[]},
  {id:30, name:"Black Truffle Pizza",  price:21.99, cat:["pizza"],             img:P.truffle_piz,  desc:"Crème fraîche base, wild mushrooms, black truffle, taleggio, fresh thyme, truffle oil.",     tags:["Vegetarian","Nut Free"],           spice:null,     popular:false, rating:4.8,reviews:98, cal:740,weight:"350g", extras:[{name:"Truffle Shavings",price:4}],                   flags:["Chef's Pick"]},
  {id:31, name:"Four Cheese",          price:16.99, cat:["pizza"],             img:P.four_cheese,  desc:"Mozzarella, gorgonzola, fontina, aged parmesan, fig jam, toasted walnuts.",                  tags:["Vegetarian"],                     spice:null,     popular:false, rating:4.6,reviews:119,cal:920,weight:"360g", extras:[],                                                    flags:[]},
  {id:32, name:"Mortadella & Pistachio",price:19.99,cat:["pizza"],             img:P.mortadella,   desc:"Whipped ricotta base, mortadella, crushed pistachios, stracciatella, lemon zest.",           tags:["Nut Free"],                        spice:null,     popular:false, rating:4.7,reviews:76, cal:800,weight:"365g", extras:[],                                                    flags:["New"]},
  {id:33, name:"Pepperoni Feast",      price:16.99, cat:["pizza"],             img:P.nduja,        desc:"Tomato base, mozzarella, double pepperoni, oregano, chilli flakes, extra sauce.",             tags:["High Protein","Nut Free","Halal"], spice:"Medium", popular:false, rating:4.7,reviews:189,cal:900,weight:"375g", extras:[{name:"Extra Pepperoni",price:2.5}],                  flags:[]},

  // ── BOWLS ─────────────────────────────────────────────────────────
  {id:34, name:"Caesar Salad",         price:13.99, cat:["popular","bowls","starters"],img:P.caesar,desc:"Crisp romaine, aged parmesan, house-made croutons, anchovy dressing, soft-boiled egg.",   tags:["Vegetarian","Nut Free"],           spice:null,     popular:true,  rating:4.5,reviews:144,cal:320,weight:"280g", extras:[{name:"Grilled Chicken",price:4}],                    flags:["Popular"]},
  {id:35, name:"Spicy Tuna Poke",      price:18.99, cat:["popular","bowls"],   img:P.poke,         desc:"Sashimi-grade tuna, spicy mayo, avocado, cucumber, seaweed, edamame, sesame sushi rice.",   tags:["High Protein","Gluten Free","Dairy Free","Halal"],spice:"Hot", popular:true,rating:4.7,reviews:94,cal:420,weight:"320g",extras:[{name:"Extra Avocado",price:2}],               flags:["Popular"]},
  {id:36, name:"Salmon Teriyaki Bowl", price:18.99, cat:["bowls"],             img:P.teriyaki,     desc:"Teriyaki-glazed salmon, jasmine rice, edamame, pickled carrot, sesame dressing, nori.",      tags:["High Protein","Gluten Free","Dairy Free","Halal"],spice:null, popular:false,rating:4.7,reviews:108,cal:510,weight:"360g",extras:[{name:"Extra Salmon",price:5}],              flags:[]},
  {id:37, name:"Falafel & Hummus",     price:12.99, cat:["bowls"],             img:P.falafel,      desc:"Crispy falafel, whipped hummus, tabbouleh, roasted peppers, tahini, warm flatbread.",        tags:["Vegan","Vegetarian","Dairy Free","Nut Free","Halal"],spice:null, popular:false,rating:4.5,reviews:84,cal:490,weight:"380g",extras:[{name:"Extra Hummus",price:1.5}],           flags:[]},
  {id:38, name:"Korean Beef Bowl",     price:16.99, cat:["bowls"],             img:P.korean,       desc:"Bulgogi beef, kimchi, fried egg, pickled daikon, gochujang, sesame, steamed rice.",          tags:["High Protein","Gluten Free","Dairy Free","Halal"],spice:"Extra Hot", popular:false,rating:4.8,reviews:117,cal:620,weight:"380g",extras:[{name:"Extra Beef",price:4}],      flags:["Chef's Pick"]},
  {id:39, name:"Acai Power Bowl",      price:11.99, cat:["bowls"],             img:P.acai,         desc:"Blended acai, banana, almond milk, granola, fresh berries, chia, honey, coconut flakes.",    tags:["Vegetarian","Vegan","Gluten Free","Dairy Free"],spice:null, popular:false,rating:4.6,reviews:72,cal:380,weight:"300g",extras:[{name:"Extra Granola",price:1}],            flags:["New"]},
  {id:40, name:"Buddha Bowl",          price:13.99, cat:["bowls"],             img:P.buddha,       desc:"Quinoa, roasted chickpeas, avocado, edamame, pickled carrot, tahini dressing.",              tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null,popular:false,rating:4.5,reviews:91,cal:440,weight:"400g",extras:[{name:"Extra Avocado",price:2}], flags:[]},
  {id:41, name:"Spicy Lamb Bowl",      price:17.99, cat:["bowls"],             img:P.korean,       desc:"Minced lamb, harissa, roasted cauliflower, tzatziki, pomegranate, couscous.",                 tags:["High Protein","Gluten Free","Halal"],spice:"Hot",   popular:false, rating:4.6,reviews:63, cal:550,weight:"360g", extras:[],                                                    flags:["New","Seasonal"]},

  // ── DESSERTS ──────────────────────────────────────────────────────
  {id:42, name:"Chocolate Lava Cake",  price:10.99, cat:["popular","desserts"],img:P.lava,         desc:"Warm dark chocolate lava cake, Madagascan vanilla ice cream, raspberry coulis, gold dust.",  tags:["Vegetarian","Nut Free"],           spice:null,     popular:true,  rating:4.9,reviews:298,cal:560,weight:"180g", extras:[{name:"Extra Ice Cream",price:2}],                    flags:["Popular"]},
  {id:43, name:"Basque Cheesecake",    price:11.99, cat:["popular","desserts"],img:P.cheesecake,   desc:"Burnt Basque cheesecake, seasonal berry compote, crème fraîche, micro herbs.",               tags:["Vegetarian","Gluten Free","Nut Free"],spice:null,   popular:true,  rating:4.9,reviews:241,cal:480,weight:"200g", extras:[{name:"Ice Cream",price:2}],                          flags:["Popular"]},
  {id:44, name:"Crème Brûlée",         price:8.99,  cat:["desserts"],          img:P.creme_brulee, desc:"Classic vanilla crème brûlée, caramelised sugar crust, fresh seasonal berries.",             tags:["Vegetarian","Gluten Free","Nut Free"],spice:null,   popular:false, rating:4.7,reviews:141,cal:420,weight:"160g", extras:[],                                                    flags:[]},
  {id:45, name:"Tiramisu",             price:9.99,  cat:["desserts"],          img:P.tiramisu,     desc:"House-made tiramisu, savoiardi soaked in espresso, mascarpone, Kahlúa, dark cocoa.",         tags:["Vegetarian","Nut Free"],           spice:null,     popular:false, rating:4.8,reviews:178,cal:490,weight:"200g", extras:[{name:"Extra Espresso",price:1}],                     flags:[]},
  {id:46, name:"Mango Sorbet",         price:6.99,  cat:["desserts"],          img:P.sorbet,       desc:"Alphonso mango sorbet, passion fruit coulis, fresh mint, coconut flakes. Dairy-free.",       tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null,popular:false,rating:4.5,reviews:63,cal:180,weight:"150g",extras:[],                           flags:[]},
  {id:47, name:"Sticky Toffee Pudding",price:9.99,  cat:["desserts"],          img:P.sticky_toff,  desc:"Classic sticky toffee pudding, salted caramel sauce, clotted cream, candied pecans.",        tags:["Vegetarian","Nut Free"],           spice:null,     popular:false, rating:4.8,reviews:204,cal:620,weight:"200g", extras:[{name:"Ice Cream",price:2}],                          flags:["Seasonal"]},
  {id:48, name:"French Macarons",      price:7.99,  cat:["desserts"],          img:P.macaron,      desc:"Assorted French macarons — pistachio, raspberry, salted caramel, vanilla, dark chocolate.",   tags:["Vegetarian","Gluten Free"],        spice:null,     popular:false, rating:4.7,reviews:112,cal:280,weight:"120g", extras:[],                                                    flags:["New"]},
  {id:49, name:"Belgian Waffle",       price:8.99,  cat:["desserts"],          img:P.waffle,       desc:"Crispy Belgian waffle, whipped cream, fresh berries, maple syrup, vanilla ice cream.",       tags:["Vegetarian","Nut Free"],           spice:null,     popular:false, rating:4.6,reviews:88, cal:540,weight:"220g", extras:[{name:"Extra Cream",price:1.5}],                      flags:[]},

  // ── DRINKS ────────────────────────────────────────────────────────
  {id:50, name:"Espresso Martini",     price:13.99, cat:["popular","drinks"],  img:P.espresso_m,   desc:"Vodka, Kahlúa, fresh double espresso, vanilla syrup, coffee bean garnish.",                  tags:["Vegan","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null, popular:true,rating:4.9,reviews:221,cal:190,weight:"200ml",extras:[{name:"Extra Shot",price:2}],               flags:["Popular"]},
  {id:51, name:"Smoke & Ember",        price:14.99, cat:["popular","drinks"],  img:P.smoke_ember,  desc:"Mezcal, charred orange, smoked honey syrup, black walnut bitters, large format ice.",         tags:["Vegan","Gluten Free","Dairy Free","Nut Free"],spice:null, popular:true,rating:4.8,reviews:97,cal:180,weight:"220ml",extras:[],                                                 flags:["Popular","Chef's Pick"]},
  {id:52, name:"Passion Fruit Mojito", price:12.99, cat:["drinks"],            img:P.mojito,       desc:"White rum, passion fruit, fresh lime, mint, sugar syrup, soda water, lime wheel.",           tags:["Vegan","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null, popular:false,rating:4.7,reviews:134,cal:160,weight:"300ml",extras:[{name:"Extra Shot",price:3}],             flags:[]},
  {id:53, name:"Berry Lemonade",       price:5.99,  cat:["drinks"],            img:P.lemonade,     desc:"House-pressed lemonade, wild berry purée, fresh mint, sparkling water. Non-alcoholic.",      tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null,popular:false,rating:4.5,reviews:88,cal:120,weight:"350ml",extras:[],                            flags:[]},
  {id:54, name:"Matcha Oat Latte",     price:5.49,  cat:["drinks"],            img:P.matcha,       desc:"Ceremonial grade matcha, steamed oat milk, light honey. Hot or iced.",                       tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null,popular:false,rating:4.6,reviews:76,cal:140,weight:"280ml",extras:[{name:"Extra Matcha",price:1}], flags:[]},
  {id:55, name:"Classic Negroni",      price:13.99, cat:["drinks"],            img:P.negroni,      desc:"Sipsmith gin, Campari, Martini Rosso, orange peel, large hand-cut ice sphere.",               tags:["Vegan","Gluten Free","Dairy Free","Nut Free"],spice:null, popular:false,rating:4.7,reviews:59,cal:170,weight:"180ml",extras:[],                                                 flags:[]},
  {id:56, name:"Tropical Smoothie",    price:6.99,  cat:["drinks"],            img:P.smoothie,     desc:"Mango, pineapple, banana, coconut milk, lime, chia seeds. Non-alcoholic.",                   tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal"],spice:null,popular:false,rating:4.4,reviews:52,cal:280,weight:"350ml",extras:[],                            flags:["New"]},
  {id:57, name:"Rosé Spritz",          price:10.99, cat:["drinks"],            img:P.smoke_ember,  desc:"Provence rosé, elderflower cordial, sparkling water, cucumber, fresh mint.",                 tags:["Vegan","Gluten Free","Dairy Free","Nut Free"],spice:null, popular:false,rating:4.5,reviews:44,cal:150,weight:"250ml",extras:[],                                                 flags:["Seasonal"]},
  // ── SIDES ─────────────────────────────────────────────────────────
  {id:58, name:"House Fries",          price:4.99,  cat:["sides"],             img:P.house_fries,  desc:"Crispy hand-cut fries, seasoned with sea salt, served with house ketchup.",             tags:["Vegetarian","Vegan","Gluten Free","Dairy Free","Nut Free","Halal"], spice:null, popular:true,  rating:4.7,reviews:312,cal:380,weight:"200g", extras:[{name:"Cheese Sauce",price:1.5},{name:"Truffle Oil",price:1.5}], flags:["Popular"]},
  {id:59, name:"Sweet Potato Fries",   price:5.99,  cat:["sides"],             img:P.sweet_pot,    desc:"Crispy sweet potato fries, smoked paprika seasoning, chipotle dipping sauce.",          tags:["Vegetarian","Vegan","Gluten Free","Dairy Free","Nut Free","Halal"], spice:null, popular:false, rating:4.6,reviews:187,cal:340,weight:"200g", extras:[{name:"Extra Sauce",price:1}], flags:[]},
  {id:60, name:"Truffle Fries",        price:6.99,  cat:["sides"],             img:P.truffle_fries2,desc:"Hand-cut fries, black truffle oil, aged parmesan, fresh chives, house aioli.",         tags:["Vegetarian","Gluten Free","Nut Free"],                           spice:null, popular:true,  rating:4.9,reviews:401,cal:420,weight:"200g", extras:[{name:"Extra Parmesan",price:1}], flags:["Popular","Chef's Pick"]},
  {id:61, name:"Onion Rings",          price:5.49,  cat:["sides"],             img:P.onion_rings,  desc:"Beer-battered onion rings, crispy golden, served with smoky chipotle mayo.",            tags:["Vegetarian","Dairy Free","Nut Free","Halal"],                    spice:null, popular:false, rating:4.5,reviews:143,cal:360,weight:"180g", extras:[], flags:[]},
  {id:62, name:"Mac & Cheese",         price:6.99,  cat:["sides"],             img:P.mac_cheese,   desc:"Creamy four-cheese mac, crispy panko breadcrumb crust, fresh chives.",                  tags:["Vegetarian","Nut Free"],                                        spice:null, popular:true,  rating:4.8,reviews:228,cal:480,weight:"250g", extras:[{name:"Pulled Chicken",price:3},{name:"Bacon Bits",price:2}], flags:["Popular"]},
  {id:63, name:"Loaded Mash",          price:5.99,  cat:["sides"],             img:P.mash,         desc:"Buttery mashed potato, cheddar, crispy bacon bits, chives, sour cream.",                tags:["Vegetarian","Gluten Free","Nut Free"],                           spice:null, popular:false, rating:4.7,reviews:156,cal:390,weight:"220g", extras:[{name:"Extra Bacon",price:2}], flags:[]},
  {id:64, name:"Coleslaw",             price:3.99,  cat:["sides"],             img:P.coleslaw,     desc:"House-made creamy coleslaw, white cabbage, carrot, apple, fresh dill.",                 tags:["Vegetarian","Gluten Free","Nut Free"],                           spice:null, popular:false, rating:4.4,reviews:98, cal:180,weight:"150g", extras:[], flags:[]},
  {id:65, name:"Side Salad",           price:4.49,  cat:["sides"],             img:P.side_salad,   desc:"Mixed leaves, cherry tomatoes, cucumber, red onion, house vinaigrette.",                tags:["Vegetarian","Vegan","Gluten Free","Dairy Free","Nut Free","Halal","Keto"], spice:null, popular:false, rating:4.3,reviews:77, cal:120,weight:"160g", extras:[{name:"Extra Dressing",price:1}], flags:[]},
  {id:66, name:"Garlic Ciabatta",      price:4.49,  cat:["sides"],             img:P.garlic_bread2,desc:"Toasted ciabatta, roasted garlic compound butter, fresh parsley, Maldon sea salt.",     tags:["Vegetarian","Nut Free"],                                        spice:null, popular:false, rating:4.5,reviews:134,cal:310,weight:"150g", extras:[{name:"Extra Butter",price:1},{name:"Cheese",price:1.5}], flags:[]},
  {id:67, name:"Corn on the Cob",      price:4.99,  cat:["sides"],             img:P.corn,         desc:"Grilled corn, smoked paprika butter, lime zest, fresh coriander, sea salt flakes.",     tags:["Vegetarian","Gluten Free","Nut Free","Halal"],                   spice:null, popular:false, rating:4.6,reviews:88, cal:220,weight:"180g", extras:[{name:"Chilli Butter",price:1}], flags:["Seasonal"]},
  {id:68, name:"Seasonal Veg",         price:4.49,  cat:["sides"],             img:P.seasonal_veg, desc:"Chef's selection of roasted seasonal vegetables, herb oil, toasted seeds.",             tags:["Vegan","Vegetarian","Gluten Free","Dairy Free","Nut Free","Halal","Keto"], spice:null, popular:false, rating:4.4,reviews:62, cal:140,weight:"180g", extras:[], flags:["Seasonal"]},
  {id:69, name:"Dauphinoise Potato",   price:5.99,  cat:["sides"],             img:P.dauphinoise,  desc:"Thinly sliced potato, gruyère cream, roasted garlic, fresh thyme. Rich and indulgent.", tags:["Vegetarian","Gluten Free","Nut Free"],                           spice:null, popular:false, rating:4.8,reviews:109,cal:420,weight:"220g", extras:[], flags:["Chef's Pick"]},
];
const UPSELL_MAP = {
  burgers: [7,58,53], mains:[13,58,42], pizza:[13,58,53], starters:[15,42,50],
  bowls:[13,42,53], desserts:[54,50,53], drinks:[58,42,43], popular:[58,13,42],
  sides:[1,15,42],
};
function getUpsells(cart) {
  if(!cart.length) return [];
  const inCart = new Set(cart.map(i=>i.id));
  const cats = new Set(cart.flatMap(i=>{ const d=RAW_DISHES.find(x=>x.id===i.id); return d?d.cat:[]; }));
  let ids = [];
  for(const c of cats){ for(const id of (UPSELL_MAP[c]||[])){ if(!inCart.has(id)&&!ids.includes(id)) ids.push(id); } }
  if(!ids.length) ids=[7,42,53];
  return ids.map(id=>RAW_DISHES.find(d=>d.id===id)).filter(Boolean).slice(0,3);
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [themeId,   setThemeId]   = useState("studio");
  const [fontId,    setFontId]    = useState("Inter");
  const [layout,    setLayout]    = useState("grid");   // grid|list|magazine|compact
  const [screen,   setScreen]   = useState("home");
  const [activeCategory, setActiveCategory] = useState("popular");
  const [selectedDish,   setSelectedDish]   = useState(null);
  const [cart,     setCart]     = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters,  setFilters]  = useState({priceMax:60,calMax:1000,diets:[],spice:null,popular:false,allergens:[]});
  const [qty,      setQty]      = useState(1);
  const [extras,   setExtras]   = useState([]);
  const [side,     setSide]     = useState(null);
  const [placed,   setPlaced]   = useState(false);
  const [service,  setService]  = useState("Dine in");
  const [checkout, setCheckout] = useState(false);
  // Admin state — toggled items/categories hidden from customer
  const [hiddenItems, setHiddenItems] = useState(new Set());
  const [hiddenCats,  setHiddenCats]  = useState(new Set());

  const baseTheme = THEMES[themeId] || THEMES.studio;
  const selectedFont = FONTS.find(f=>f.id===fontId) || FONTS[0];
  const TH = { ...baseTheme, font: selectedFont.family, headFont: selectedFont.family };

  // Sync body background with theme so desktop sides match, not black
  useEffect(()=>{ document.body.style.background = TH.bg; },[TH.bg]);

  // Load Google Fonts dynamically
  useEffect(()=>{
    const fontMap = {
      "Inter":"Inter:wght@400;600;700",
      "DM Sans":"DM+Sans:wght@400;600;700",
      "Poppins":"Poppins:wght@400;600;700",
      "Playfair Display":"Playfair+Display:wght@400;700",
      "Lora":"Lora:wght@400;600;700",
      "Cormorant Garamond":"Cormorant+Garamond:wght@400;600;700",
      "Raleway":"Raleway:wght@400;600;700",
      "Nunito":"Nunito:wght@400;600;700",
      "Quicksand":"Quicksand:wght@400;600;700",
      "Source Sans Pro":"Source+Sans+3:wght@400;600;700",
    };
    const id = "gfont-"+fontId.replace(/\s/g,"-");
    if(!document.getElementById(id)){
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontMap[fontId]}&display=swap`;
      document.head.appendChild(link);
    }
  },[fontId]);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);

  // Dishes visible to customer (respects admin toggles)
  const visibleDishes = RAW_DISHES.filter(d=>!hiddenItems.has(d.id));
  const visibleCats   = CATEGORIES_DEF.filter(c=>!hiddenCats.has(c.id));
  const featured      = visibleDishes.filter(d=>d.popular).slice(0,5);

  const [search,    setSearch]    = useState("");
  const [showSearch,setShowSearch]= useState(false);

  const getFiltered = (catId) => {
    // "all" means show every visible dish, no category filter
    let d = catId==="all"
      ? visibleDishes
      : catId==="popular"
        ? visibleDishes.filter(x=>x.popular)
        : visibleDishes.filter(x=>x.cat.includes(catId));

    if(filters.popular)            d=d.filter(x=>x.popular);
    if(filters.diets.length>0)     d=d.filter(x=>filters.diets.every(t=>x.tags.includes(t)));
    if(filters.spice)              d=d.filter(x=>x.spice===filters.spice);
    if(filters.priceMax<60)        d=d.filter(x=>x.price<=filters.priceMax);
    if(filters.calMax<1000)        d=d.filter(x=>x.cal<=filters.calMax);
    if(filters.allergens.length>0) d=d.filter(x=>filters.allergens.every(a=>x.tags.includes(a)));

    // Search across name, desc, tags AND category
    if(search.trim().length>0) {
      const q=search.trim().toLowerCase();
      d=d.filter(x=>
        x.name.toLowerCase().includes(q)||
        x.desc.toLowerCase().includes(q)||
        x.tags.some(t=>t.toLowerCase().includes(q))||
        x.cat.some(c=>c.toLowerCase().includes(q))
      );
    }
    return d;
  };

  const addToCart=(dish,q=1,exts=[])=>{
    const ep=exts.reduce((s,e)=>s+e.price,0);
    setCart(prev=>{ const ex=prev.find(i=>i.id===dish.id); if(ex) return prev.map(i=>i.id===dish.id?{...i,qty:i.qty+q}:i); return [...prev,{...dish,qty:q,price:dish.price+ep}]; });
  };
  const updateQty=(id,delta)=>setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(0,i.qty+delta)}:i).filter(i=>i.qty>0));
  const openDish=(dish)=>{ setSelectedDish(dish); setQty(1); setExtras([]); setSide(null); };
  const applyFilters=(f)=>{ setFilters({priceMax:60,calMax:1000,diets:[],spice:null,popular:false,allergens:[],...f}); setShowFilter(false); setActiveCategory("all"); setScreen("browse"); };

  const css=`*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{display:none;}input,button{font-family:inherit;}
  html,body{margin:0;padding:0;width:100%;background:var(--app-bg,#0e0e0e);}
  @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
  .btn{transition:all 0.15s ease;cursor:pointer;}.btn:active{opacity:0.75;transform:scale(0.96);}
  .cat-card:active{transform:scale(0.95)!important;}.cat-card:hover .ci{transform:scale(1.07);}
  .di{overflow:hidden!important;-webkit-mask-image:-webkit-radial-gradient(white,black);}
  .di:hover .dimg{transform:scale(1.05);}
  img{display:block;}
  input[type=range]{-webkit-appearance:none;height:4px;border-radius:4px;outline:none;}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2);}
  .sheet-scroll{overscroll-behavior:contain;-webkit-overflow-scrolling:touch;}
  .sheet-wrap{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;height:100%;z-index:200;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none;}
  .sheet-wrap>*{pointer-events:all;}
  .sheet-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);}
  .filter-wrap{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;height:100%;z-index:300;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none;}
  .filter-wrap>*{pointer-events:all;}`;

  if(placed) return (
    <div style={{fontFamily:TH.font,background:TH.bg,minHeight:"100vh",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,textAlign:"center"}}>
      <style>{css}</style>
      <div style={{width:80,height:80,borderRadius:"50%",background:TH.accentLight,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={TH.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 style={{fontSize:26,fontWeight:700,fontFamily:TH.headFont,color:TH.text,marginBottom:8}}>Order Placed!</h2>
      <p style={{fontSize:15,color:TH.text2,marginBottom:32}}>Being prepared now — est. 20–25 mins</p>
      <button className="btn" onClick={()=>{setPlaced(false);setCart([]);setScreen("home");setCheckout(false);}} style={{padding:"14px 40px",borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:16,fontWeight:700,fontFamily:TH.headFont}}>Back to Menu</button>
    </div>
  );

  return (
    <div style={{fontFamily:TH.font,background:TH.bg,minHeight:"100vh",width:"100%",maxWidth:430,margin:"0 auto",position:"relative",overflowX:"hidden",transition:"background 0.3s ease,color 0.3s ease"}}>
      <style>{css}</style>
      {screen==="home"   && <HomeScreen   TH={TH} cartCount={cartCount} setScreen={setScreen} setActiveCategory={setActiveCategory} featured={featured} openDish={openDish} addToCart={addToCart} setShowFilter={setShowFilter} visibleCats={visibleCats} visibleDishes={visibleDishes} layout={layout} search={search} setSearch={setSearch} setShowSearch={setShowSearch} />}
      {showSearch && <SearchOverlay TH={TH} search={search} setSearch={setSearch} onClose={()=>setShowSearch(false)} onSearch={(q)=>{setSearch(q);setShowSearch(false);setActiveCategory("all");setScreen("browse");}} />}
      {screen==="browse" && <BrowseScreen TH={TH} cartCount={cartCount} setScreen={setScreen} activeCategory={activeCategory} setActiveCategory={setActiveCategory} getFiltered={getFiltered} openDish={openDish} addToCart={addToCart} cart={cart} filters={filters} setShowFilter={setShowFilter} visibleCats={visibleCats} layout={layout} setLayout={setLayout} visibleDishes={visibleDishes} search={search} setSearch={setSearch} />}
      {screen==="cart"   && <CartScreen   TH={TH} cart={cart} updateQty={updateQty} cartTotal={cartTotal} setScreen={setScreen} service={service} setService={setService} onCheckout={()=>setPlaced(true)} checkout={checkout} setCheckout={setCheckout} addToCart={addToCart} openDish={openDish} clearCart={()=>setCart([])} />}
      {screen==="admin"  && <AdminScreen  TH={TH} setScreen={setScreen} themeId={themeId} setThemeId={setThemeId} fontId={fontId} setFontId={setFontId} layout={layout} setLayout={setLayout} hiddenItems={hiddenItems} setHiddenItems={setHiddenItems} hiddenCats={hiddenCats} setHiddenCats={setHiddenCats} />}
      {selectedDish && <DishSheet dish={selectedDish} TH={TH} qty={qty} setQty={setQty} extras={extras} setExtras={setExtras} side={side} setSide={setSide} onClose={()=>setSelectedDish(null)} onAdd={()=>{addToCart(selectedDish,qty,[...extras,...(side&&side.price>0?[{name:side.name,price:side.price}]:[])]);setSelectedDish(null);}} />}
      {showFilter && <FilterSheet TH={TH} onApply={applyFilters} onClose={()=>setShowFilter(false)} current={filters} visibleDishes={visibleDishes} />}
      {screen!=="admin" && <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} TH={TH} />}
    </div>
  );
}

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
function HeroCarousel({ dishes, TH, onOpen }) {
  const [idx,setIdx]=useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  useEffect(()=>{ const t=setInterval(()=>setIdx(i=>(i+1)%dishes.length),4000); return()=>clearInterval(t); },[dishes.length]);
  if(!dishes.length) return null;
  const dish=dishes[idx];
  return (
    <div
      style={{position:"relative",height:430,overflow:"hidden",cursor:"pointer"}}
      onClick={()=>onOpen(dish)}
      onTouchStart={e=>{ const t=e.touches[0]; touchStartX.current=t.clientX; touchStartY.current=t.clientY; }}
      onTouchEnd={e=>{
        const dx=e.changedTouches[0].clientX-touchStartX.current;
        const dy=Math.abs(e.changedTouches[0].clientY-touchStartY.current);
        if(Math.abs(dx)>40&&dy<60){
          e.stopPropagation();
          if(dx<0) setIdx(i=>(i+1)%dishes.length);
          else setIdx(i=>(i-1+dishes.length)%dishes.length);
        }
      }}
    >
      {dishes.map((d,i)=>(
        <div key={d.id} style={{position:"absolute",inset:0,opacity:i===idx?1:0,transition:"opacity 1.2s ease"}}>
          <img src={d.img} alt={d.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          <div style={{position:"absolute",inset:0,background:TH.heroOverlay}} />
        </div>
      ))}
      {/* Restaurant name */}
      <div style={{position:"absolute",top:0,left:0,right:0,padding:"52px 20px 0",textAlign:"center",zIndex:10,pointerEvents:"none"}}>
        <p style={{fontSize:11,fontFamily:TH.headFont,color:"rgba(255,255,255,0.85)",letterSpacing:4,textTransform:"uppercase",textShadow:"0 1px 8px rgba(0,0,0,0.5)"}}>Ember & Rye</p>
        {TH.id==="upscale"&&<div style={{width:32,height:1,background:"#c9a84c",margin:"6px auto 0",opacity:0.7}}/>}
      </div>
      {/* Left / right tap zones */}
      <div onClick={e=>{e.stopPropagation();setIdx(i=>(i-1+dishes.length)%dishes.length);}} style={{position:"absolute",top:0,left:0,width:"20%",height:"100%",zIndex:11}}/>
      <div onClick={e=>{e.stopPropagation();setIdx(i=>(i+1)%dishes.length);}} style={{position:"absolute",top:0,right:0,width:"20%",height:"100%",zIndex:11}}/>
      {/* Dish info */}
      <div onClick={e=>{e.stopPropagation();onOpen(dish);}} style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 20px 38px",zIndex:12,cursor:"pointer"}}>
        <p style={{fontSize:10,color:"rgba(255,255,255,0.65)",letterSpacing:2.5,textTransform:"uppercase",marginBottom:6,fontFamily:TH.font}}>Featured tonight</p>
        <h2 style={{fontSize:TH.id==="bold"?32:26,fontFamily:TH.headFont,fontWeight:TH.id==="bold"?900:700,color:"#fff",lineHeight:1.15,marginBottom:10,textShadow:"0 2px 14px rgba(0,0,0,0.45)"}}>{dish.name}</h2>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <span style={{fontSize:22,fontWeight:800,color:TH.id==="upscale"?"#c9a84c":"#fff",fontFamily:TH.headFont}}>${dish.price.toFixed(2)}</span>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.75)"}}>★ {dish.rating}</span>
          </div>
          <div style={{padding:"11px 22px",borderRadius:TH.btnRadius,background:TH.accent,color:TH.accentText,fontSize:14,fontWeight:700,fontFamily:TH.font,boxShadow:"0 4px 20px rgba(0,0,0,0.35)"}}>
            View dish
          </div>
        </div>
      </div>
      {/* Dot indicators */}
      <div style={{position:"absolute",bottom:12,left:0,right:0,display:"flex",justifyContent:"center",gap:5,zIndex:12}}>
        {dishes.map((_,i)=><div key={i} onClick={e=>{e.stopPropagation();setIdx(i);}} style={{width:i===idx?22:6,height:6,borderRadius:3,cursor:"pointer",background:i===idx?TH.accent:"rgba(255,255,255,0.35)",transition:"all 0.3s ease"}}/>)}
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ TH, cartCount, setScreen, setActiveCategory, featured, openDish, addToCart, setShowFilter, visibleCats, visibleDishes, layout, search, setSearch, setShowSearch }) {
  const goTo=(catId)=>{ setActiveCategory(catId); setScreen("browse"); };
  const popular=visibleDishes.filter(d=>d.popular);

  const handleSearch=(e)=>{
    setSearch(e.target.value);
  };
  const handleSearchSubmit=(e)=>{
    if(e.key==="Enter"&&search.trim().length>0){
      setActiveCategory("all");
      setScreen("browse");
    }
  };
  return (
    <div style={{background:TH.bg,minHeight:"100vh",paddingBottom:90}}>

      {/* Fixed top bar — restaurant name stays put while scrolling */}
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:30,background:TH.navBg,borderBottom:`1px solid ${TH.border}`,padding:"14px 20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{textAlign:"center"}}>
          <p style={{fontSize:12,fontWeight:700,color:TH.text,letterSpacing:3,textTransform:"uppercase",fontFamily:TH.headFont}}>Ember & Rye</p>
          {TH.id==="upscale"&&<div style={{width:24,height:1,background:"#c9a84c",margin:"4px auto 0",opacity:0.7}}/>}
        </div>
      </div>

      {/* Scrollable content — starts below fixed bar */}
      <div style={{paddingTop:52}}>
        <HeroCarousel dishes={featured} TH={TH} onOpen={openDish}/>
        <div style={{padding:"16px 20px 0"}}>
          {/* Search — tapping opens full search overlay */}
          <div className="btn" onClick={()=>setShowSearch(true)} style={{display:"flex",gap:10,background:TH.bg2,borderRadius:TH.btnRadius,padding:"11px 16px",marginBottom:20,alignItems:"center",border:`1px solid ${TH.border}`,cursor:"pointer"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TH.text2} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{fontSize:14,color:search?TH.text:TH.text2,flex:1,fontFamily:TH.font}}>{search||"Search dishes, ingredients..."}</span>
            {search&&<span style={{fontSize:11,color:TH.accent,fontWeight:600}}>{search}</span>}
            <button className="btn" onClick={e=>{e.stopPropagation();setShowFilter(true);}} style={{background:"none",border:"none",padding:2,display:"flex",alignItems:"center"}}><FilterIcon color={TH.accent}/></button>
          </div>
          {/* Browse header with See all */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <p style={{fontSize:12,fontWeight:700,color:TH.text2,letterSpacing:1.2,textTransform:"uppercase",fontFamily:TH.headFont}}>Browse</p>
            <button className="btn" onClick={()=>goTo("all")} style={{background:"none",border:"none",fontSize:13,color:TH.accent,fontWeight:600,fontFamily:TH.font}}>See all</button>
          </div>
        <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none",marginBottom:24}}>
          {visibleCats.map(cat=>{
            const count=visibleDishes.filter(d=>cat.id==="popular"?d.popular:d.cat.includes(cat.id)).length;
            return (
              <div key={cat.id} className="cat-card btn" onClick={()=>goTo(cat.id)} style={{flexShrink:0,width:130,height:155,borderRadius:TH.cardRadius,overflow:"hidden",position:"relative",cursor:"pointer",boxShadow:TH.shadow}}>
                <img className="ci" src={cat.img} alt={cat.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s ease"}} />
                <div style={{position:"absolute",inset:0,background:`linear-gradient(to top,${cat.color}f0 0%,${cat.color}70 55%,${cat.color}20 100%)`}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 12px 12px"}}>
                  <p style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:TH.headFont,marginBottom:2}}>{cat.name}</p>
                  <p style={{fontSize:10,color:"rgba(255,255,255,0.82)"}}>{count} {count===1?"dish":"dishes"}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Popular grid */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <p style={{fontSize:15,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>{TH.id==="upscale"?"Tonight's Selections":TH.id==="cozy"?"Our Most Loved":TH.id==="fresh"?"Fresh Picks":"Most Ordered"}</p>
          <button className="btn" onClick={()=>goTo("popular")} style={{background:"none",border:"none",fontSize:13,color:TH.accent,fontWeight:600,fontFamily:TH.font}}>See all</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,paddingBottom:20}}>
          {popular.slice(0,6).map((dish,i)=>(
            <DishCard key={dish.id} dish={dish} TH={TH} onOpen={openDish} onAdd={addToCart} i={i} inCart={false} layout="grid"/>
          ))}
        </div>
        </div>{/* end padding div */}
      </div>{/* end scrollable wrapper */}
    </div>
  );
}

// ─── DISH CARD (handles all 4 layouts) ────────────────────────────────────────
function DishCard({ dish, TH, onOpen, onAdd, i=0, inCart=false, layout="grid" }) {
  const spiceIcon = dish.spice ? SPICE_ICON(dish.spice) : null;

  if(layout==="list") return (
    <div className="btn" onClick={()=>onOpen(dish)} style={{display:"flex",gap:12,background:TH.bg,borderBottom:`1px solid ${TH.border}`,padding:"12px 20px",animation:`fadeIn 0.35s ease ${i*40}ms both`}}>
      <div style={{width:76,height:76,borderRadius:TH.cardRadius,overflow:"hidden",flexShrink:0,position:"relative",backgroundColor:TH.bg2}}>
        <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
        {dish.popular&&<span style={{position:"absolute",top:4,left:4,background:TH.accent,color:TH.accentText,fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:TH.tagRadius}}>★</span>}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3}}>
          <p style={{fontSize:14,fontWeight:700,color:TH.text,fontFamily:TH.headFont,paddingRight:8,flex:1}}>{dish.name} {spiceIcon&&<span style={{fontSize:11}}>{spiceIcon}</span>}</p>
          <span style={{fontSize:14,fontWeight:800,color:TH.accent,fontFamily:TH.headFont,flexShrink:0}}>${dish.price.toFixed(2)}</span>
        </div>
        <p style={{fontSize:11,color:TH.text2,lineHeight:1.4,marginBottom:6}}>{dish.desc.substring(0,60)}...</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:4}}>
            {dish.tags.slice(0,2).map(tag=><span key={tag} style={{fontSize:9,padding:"1px 6px",borderRadius:TH.tagRadius,background:TAG_STYLE[tag]?.bg||TH.bg2,color:TAG_STYLE[tag]?.color||TH.text2}}>{tag}</span>)}
          </div>
          <button className="btn" onClick={e=>{e.stopPropagation();onAdd(dish);}} style={{width:26,height:26,borderRadius:"50%",background:inCart?TH.accent:TH.bg2,border:`1px solid ${TH.border}`,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",color:inCart?TH.accentText:TH.text}}>+</button>
        </div>
      </div>
    </div>
  );

  if(layout==="magazine") return (
    <div className="di btn" onClick={()=>onOpen(dish)} style={{background:TH.card,borderRadius:TH.cardRadius,border:`1px solid ${TH.border}`,marginBottom:16,overflow:"hidden",animation:`fadeIn 0.35s ease ${i*50}ms both`,boxShadow:TH.shadow}}>
      <div style={{height:220,overflow:"hidden",position:"relative"}}>
        <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)"}}/>
        {dish.popular&&<span style={{position:"absolute",top:12,left:12,background:TH.accent,color:TH.accentText,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:TH.tagRadius}}>Popular</span>}
        {spiceIcon&&<span style={{position:"absolute",top:12,right:12,fontSize:16}}>{spiceIcon}</span>}
        <div style={{position:"absolute",bottom:12,left:12,right:12}}>
          <p style={{fontSize:18,fontWeight:700,color:"#fff",fontFamily:TH.headFont,textShadow:"0 1px 8px rgba(0,0,0,0.5)"}}>{dish.name}</p>
        </div>
      </div>
      <div style={{padding:"12px 14px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <p style={{fontSize:15,fontWeight:800,color:TH.accent,fontFamily:TH.headFont,marginBottom:2}}>${dish.price.toFixed(2)}</p>
          <p style={{fontSize:11,color:TH.text2}}>★ {dish.rating} · {dish.cal} cal</p>
        </div>
        <button className="btn" onClick={e=>{e.stopPropagation();onAdd(dish);}} style={{padding:"9px 18px",borderRadius:TH.btnRadius,background:TH.accent,border:"none",color:TH.accentText,fontSize:13,fontWeight:700,fontFamily:TH.font}}>Add</button>
      </div>
    </div>
  );

  if(layout==="compact") return (
    <div className="btn" onClick={()=>onOpen(dish)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:`1px solid ${TH.border}`,background:TH.bg,width:"100%",animation:`fadeIn 0.3s ease ${i*30}ms both`}}>
      <div style={{flex:1}}>
        <p style={{fontSize:14,fontWeight:600,color:TH.text,fontFamily:TH.headFont}}>{dish.name} {spiceIcon&&<span style={{fontSize:12}}>{spiceIcon}</span>}</p>
        <p style={{fontSize:12,color:TH.text2,marginTop:2}}>{dish.tags.slice(0,2).join(" · ")}</p>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:14,fontWeight:700,color:TH.accent,fontFamily:TH.headFont}}>${dish.price.toFixed(2)}</span>
        <button className="btn" onClick={e=>{e.stopPropagation();onAdd(dish);}} style={{width:28,height:28,borderRadius:"50%",background:TH.accent,border:"none",color:TH.accentText,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
      </div>
    </div>
  );

  // DEFAULT: grid
  return (
    <div className="di btn" onClick={()=>onOpen(dish)} style={{background:TH.card,borderRadius:TH.cardRadius,overflow:"hidden",border:`1px solid ${TH.border}`,boxShadow:TH.shadow,animation:`fadeIn 0.35s ease ${i*50}ms both`}}>
      {/* Image area */}
      <div style={{position:"relative",height:130,overflow:"hidden"}}>
        <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s ease"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)"}}/>
        {dish.popular && <span style={{position:"absolute",top:7,left:7,background:TH.accent,color:TH.accentText,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:TH.tagRadius}}>Popular</span>}
        {spiceIcon && <span style={{position:"absolute",top:7,right:7,fontSize:12}}>{spiceIcon}</span>}
        {/* Dish name on image — one place only */}
        <p style={{position:"absolute",bottom:7,left:8,right:8,fontSize:12,fontWeight:700,color:"#fff",fontFamily:TH.headFont,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textShadow:"0 1px 4px rgba(0,0,0,0.8)",margin:0}}>{dish.name}</p>
      </div>
      {/* Card body — price, desc, tags, + button */}
      <div style={{padding:"10px 10px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
          <p style={{fontSize:14,fontWeight:800,color:TH.accent,fontFamily:TH.headFont,margin:0}}>${dish.price.toFixed(2)}</p>
          <button className="btn" onClick={e=>{e.stopPropagation();onAdd(dish);}} style={{width:26,height:26,borderRadius:"50%",background:inCart?TH.accent:TH.bg2,border:`1.5px solid ${inCart?TH.accent:TH.border}`,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",color:inCart?TH.accentText:TH.text,lineHeight:1,flexShrink:0}}>{inCart?"✓":"+"}</button>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {dish.tags.slice(0,2).map(tag=><span key={tag} style={{fontSize:10,padding:"2px 6px",borderRadius:TH.tagRadius,background:TAG_STYLE[tag]?.bg||TH.bg2,color:TAG_STYLE[tag]?.color||TH.text2}}>{tag}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── BROWSE ───────────────────────────────────────────────────────────────────
function BrowseScreen({ TH, cartCount, setScreen, activeCategory, setActiveCategory, getFiltered, openDish, addToCart, cart, filters, setShowFilter, visibleCats, layout, setLayout, visibleDishes, search, setSearch }) {
  const filtered = getFiltered(activeCategory);
  const activeCount = (filters.priceMax<60?1:0)+(filters.calMax<1000?1:0)+(filters.diets||[]).length+(filters.spice?1:0)+(filters.popular?1:0)+(filters.allergens||[]).length;

  // Bug 6: only show category tabs that have >0 results for current filters+search
  const catHasResults = (catId) => {
    if(catId==="all") return true;
    return getFiltered(catId).length > 0;
  };

  const isGrid = layout==="grid";
  const isMag  = layout==="magazine";

  return (
    <div style={{background:TH.bg,minHeight:"100vh",paddingBottom:90}}>
      <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:20,background:TH.navBg,paddingTop:12,borderBottom:`1px solid ${TH.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 20px 10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button className="btn" onClick={()=>setScreen("home")} style={{background:TH.bg2,border:"none",width:36,height:36,borderRadius:TH.btnRadius,fontSize:16,color:TH.text}}>←</button>
            <span style={{fontSize:16,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Menu</span>
          </div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <button className="btn" onClick={()=>setLayout("grid")} style={{background:layout==="grid"?TH.accent:TH.bg2,border:`1px solid ${layout==="grid"?TH.accent:TH.border}`,borderRadius:TH.btnRadius,padding:"6px 10px",fontSize:11,color:layout==="grid"?TH.accentText:TH.text2,fontFamily:TH.font}}>⊞</button>
            <button className="btn" onClick={()=>setLayout("list")} style={{background:layout==="list"?TH.accent:TH.bg2,border:`1px solid ${layout==="list"?TH.accent:TH.border}`,borderRadius:TH.btnRadius,padding:"6px 10px",fontSize:11,color:layout==="list"?TH.accentText:TH.text2,fontFamily:TH.font}}>≡</button>
            <button className="btn" onClick={()=>setLayout("magazine")} style={{background:layout==="magazine"?TH.accent:TH.bg2,border:`1px solid ${layout==="magazine"?TH.accent:TH.border}`,borderRadius:TH.btnRadius,padding:"6px 10px",fontSize:11,color:layout==="magazine"?TH.accentText:TH.text2,fontFamily:TH.font}}>▤</button>
            <button className="btn" onClick={()=>setLayout("compact")} style={{background:layout==="compact"?TH.accent:TH.bg2,border:`1px solid ${layout==="compact"?TH.accent:TH.border}`,borderRadius:TH.btnRadius,padding:"6px 10px",fontSize:11,color:layout==="compact"?TH.accentText:TH.text2,fontFamily:TH.font}}>☰</button>
            <button className="btn" onClick={()=>setShowFilter(true)} style={{background:"none",border:"none",position:"relative",padding:4}}>
              <FilterIcon color={activeCount>0?TH.accent:TH.text2}/>
              {activeCount>0&&<span style={{position:"absolute",top:-2,right:-2,background:TH.accent,color:TH.accentText,borderRadius:"50%",width:14,height:14,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{activeCount}</span>}
            </button>
            <button className="btn" onClick={()=>setScreen("cart")} style={{background:"none",border:"none",position:"relative"}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TH.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:TH.accent,color:TH.accentText,borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Bug 2: search bar in browse screen too */}
        <div style={{display:"flex",gap:10,background:TH.bg2,borderRadius:TH.btnRadius,padding:"9px 14px",margin:"0 20px 10px",alignItems:"center",border:`1px solid ${TH.border}`}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TH.text2} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes, ingredients..." style={{background:"none",border:"none",outline:"none",fontSize:13,color:TH.text,flex:1,fontFamily:TH.font}}/>
          {search.length>0&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:TH.text2,fontSize:16,cursor:"pointer",lineHeight:1}}>×</button>}
        </div>

        {/* Bug 1+6: All clears everything; hide tabs with 0 results */}
        <div style={{display:"flex",gap:6,overflowX:"auto",padding:"0 20px 12px",scrollbarWidth:"none"}}>
          {/* All tab — standalone, clears category selection */}
          <button className="btn" onClick={()=>setActiveCategory("all")} style={{whiteSpace:"nowrap",padding:"7px 16px",borderRadius:TH.btnRadius,border:"none",background:activeCategory==="all"?TH.accent:TH.bg2,color:activeCategory==="all"?TH.accentText:TH.text2,fontSize:13,fontWeight:activeCategory==="all"?700:400,fontFamily:TH.font}}>All</button>
          {/* Popular tab — separate from All */}
          {catHasResults("popular")&&<button className="btn" onClick={()=>setActiveCategory("popular")} style={{whiteSpace:"nowrap",padding:"7px 16px",borderRadius:TH.btnRadius,border:"none",background:activeCategory==="popular"?TH.accent:TH.bg2,color:activeCategory==="popular"?TH.accentText:TH.text2,fontSize:13,fontWeight:activeCategory==="popular"?700:400,fontFamily:TH.font}}>Popular</button>}
          {visibleCats.filter(cat=>cat.id!=="popular"&&catHasResults(cat.id)).map(cat=>{
            const isActive=cat.id===activeCategory;
            return <button key={cat.id} className="btn" onClick={()=>setActiveCategory(cat.id)} style={{whiteSpace:"nowrap",padding:"7px 16px",borderRadius:TH.btnRadius,border:"none",background:isActive?TH.accent:TH.bg2,color:isActive?TH.accentText:TH.text2,fontSize:13,fontWeight:isActive?700:400,fontFamily:TH.font}}>{cat.name}</button>;
          })}
        </div>
      </div>

      {/* Spacer to push content below fixed header */}
      <div style={{height:170}}/>

      {activeCount>0&&(
        <div style={{padding:"10px 20px 0",display:"flex",gap:6,flexWrap:"wrap"}}>
          {filters.popular&&<Pill label="Popular" TH={TH}/>}
          {filters.priceMax<60&&<Pill label={`Under $${filters.priceMax}`} TH={TH}/>}
          {filters.calMax<1000&&<Pill label={`≤${filters.calMax} cal`} TH={TH}/>}
          {(filters.diets||[]).map(d=><Pill key={d} label={d} TH={TH}/>)}
          {(filters.allergens||[]).map(a=><Pill key={a} label={`${a} free`} TH={TH} color="#e65100" bg="#fff3e0"/>)}
          {filters.spice&&<Pill label={filters.spice} TH={TH}/>}
        </div>
      )}

      <div style={{padding: (layout==="compact"||layout==="list") ? "14px 0" : "14px 20px"}}>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px"}}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={TH.border} strokeWidth="1.5" strokeLinecap="round" style={{marginBottom:12}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <p style={{fontSize:16,color:TH.text2}}>No dishes match — try adjusting filters</p>
          </div>
        ):(
          isGrid||isMag ? (
            <div style={{display:isGrid?"grid":"block",gridTemplateColumns:"1fr 1fr",gap:isGrid?12:0,background:isMag?TH.bg:"transparent"}}>
              {filtered.map((dish,i)=><DishCard key={dish.id} dish={dish} TH={TH} onOpen={openDish} onAdd={addToCart} i={i} inCart={!!cart.find(c=>c.id===dish.id)} layout={layout}/>)}
            </div>
          ) : (
            <div style={{background:TH.bg,width:"100%"}}>
              {filtered.map((dish,i)=><DishCard key={dish.id} dish={dish} TH={TH} onOpen={openDish} onAdd={addToCart} i={i} inCart={!!cart.find(c=>c.id===dish.id)} layout={layout}/>)}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Pill({ label, TH, color, bg }) {
  return <span style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:bg||TH.accentLight,color:color||TH.accent,fontWeight:600}}>{label}</span>;
}

// ─── DISH SHEET ───────────────────────────────────────────────────────────────
function DishSheet({ dish, TH, qty, setQty, extras, setExtras, side, setSide, onClose, onAdd }) {
  const sidePrice = side?.price||0;
  const ext=extras.reduce((s,e)=>s+e.price,0), total=(dish.price+ext+sidePrice)*qty;
  const toggle=(e)=>setExtras(prev=>prev.find(x=>x.name===e.name)?prev.filter(x=>x.name!==e.name):[...prev,e]);
  const freeSides = (dish.sides||[]).filter(s=>!s.premium);
  const premiumSides = (dish.sides||[]).filter(s=>s.premium);
  return (
    <div>
      <div className="sheet-overlay" onClick={onClose}/>
      <div className="sheet-wrap">
        <div className="sheet-scroll" style={{position:"relative",background:TH.bg,borderRadius:"24px 24px 0 0",maxHeight:"92vh",overflowY:"auto",animation:"slideUp 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{width:40,height:4,borderRadius:2,background:TH.border,margin:"12px auto 0"}}/>
        <div style={{position:"relative",height:250,overflow:"hidden",marginTop:12}}>
          <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          <button className="btn" onClick={onClose} style={{position:"absolute",top:14,right:14,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.5)",border:"none",color:"#fff",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          {dish.popular&&<span style={{position:"absolute",top:14,left:14,background:TH.accent,color:TH.accentText,fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:TH.tagRadius}}>Popular</span>}
          {dish.spice&&<span style={{position:"absolute",bottom:14,right:14,fontSize:20}}>{SPICE_ICON(dish.spice)}</span>}
        </div>
        <div style={{padding:"20px 20px 44px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
            <h2 style={{fontSize:22,fontWeight:700,fontFamily:TH.headFont,color:TH.text,flex:1,paddingRight:12}}>{dish.name}</h2>
            <span style={{fontSize:22,fontWeight:800,color:TH.accent,fontFamily:TH.headFont}}>${dish.price.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:14,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:TH.text2}}>{dish.weight} · {dish.cal} cal</span>
            <span style={{fontSize:12,color:"#f59e0b"}}>★ {dish.rating} ({dish.reviews})</span>
            {dish.spice&&<span style={{fontSize:12,color:"#b91c1c"}}>{SPICE_ICON(dish.spice)} {dish.spice}</span>}
          </div>
          <p style={{fontSize:14,color:TH.text2,lineHeight:1.7,marginBottom:14}}>{dish.desc}</p>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
            {dish.tags.map(tag=><span key={tag} style={{fontSize:12,padding:"4px 12px",borderRadius:TH.tagRadius,background:TAG_STYLE[tag]?.bg||TH.bg2,color:TAG_STYLE[tag]?.color||TH.text2,fontWeight:500}}>{tag}</span>)}
            {dish.flags&&dish.flags.map(f=><span key={f} style={{fontSize:12,padding:"4px 12px",borderRadius:TH.tagRadius,background:TAG_STYLE[f]?.bg||"#fef9c3",color:TAG_STYLE[f]?.color||"#92400e",fontWeight:500}}>{f}</span>)}
          </div>
          {dish.extras&&dish.extras.length>0&&(
            <div style={{marginBottom:18}}>
              <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:10,fontFamily:TH.headFont}}>Add extras</p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {dish.extras.map(e=>{const a=extras.find(x=>x.name===e.name);return <button key={e.name} className="btn" onClick={()=>toggle(e)} style={{padding:"8px 14px",borderRadius:TH.btnRadius,border:`2px solid ${a?TH.accent:TH.border}`,background:a?TH.accentLight:TH.bg2,color:a?TH.accent:TH.text2,fontSize:13,fontWeight:a?700:400}}>{e.name} +${e.price.toFixed(2)}</button>;})}
              </div>
            </div>
          )}

          {/* Choose your side */}
          {(dish.sides||[]).length>0&&(
            <div style={{marginBottom:18}}>
              <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:4,fontFamily:TH.headFont}}>Choose your side</p>
              <p style={{fontSize:11,color:TH.text2,marginBottom:10}}>Pick one — included with your meal</p>
              {/* Free sides */}
              {freeSides.length>0&&(
                <div style={{marginBottom:8}}>
                  <p style={{fontSize:11,fontWeight:600,color:TH.text2,letterSpacing:0.5,marginBottom:6}}>Included</p>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {freeSides.map(s=>{
                      const active=side?.name===s.name;
                      return (
                        <div key={s.name} className="btn" onClick={()=>setSide(active?null:s)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:TH.btnRadius,border:`1.5px solid ${active?TH.accent:TH.border}`,background:active?TH.accentLight:TH.bg2,cursor:"pointer"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${active?TH.accent:TH.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                              {active&&<div style={{width:8,height:8,borderRadius:"50%",background:TH.accent}}/>}
                            </div>
                            <span style={{fontSize:14,color:active?TH.accent:TH.text,fontWeight:active?600:400,fontFamily:TH.font}}>{s.name}</span>
                          </div>
                          <span style={{fontSize:12,fontWeight:700,color:"#16a34a"}}>Free</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Premium sides */}
              {premiumSides.length>0&&(
                <div>
                  <p style={{fontSize:11,fontWeight:600,color:TH.text2,letterSpacing:0.5,marginBottom:6}}>Premium upgrades</p>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {premiumSides.map(s=>{
                      const active=side?.name===s.name;
                      return (
                        <div key={s.name} className="btn" onClick={()=>setSide(active?null:s)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:TH.btnRadius,border:`1.5px solid ${active?TH.accent:TH.border}`,background:active?TH.accentLight:TH.bg2,cursor:"pointer"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${active?TH.accent:TH.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                              {active&&<div style={{width:8,height:8,borderRadius:"50%",background:TH.accent}}/>}
                            </div>
                            <div>
                              <span style={{fontSize:14,color:active?TH.accent:TH.text,fontWeight:active?600:400,fontFamily:TH.font}}>{s.name}</span>
                              <span style={{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:8,background:"#fff7ed",color:"#c2410c",marginLeft:6}}>Premium</span>
                            </div>
                          </div>
                          <span style={{fontSize:12,fontWeight:700,color:TH.accent}}>+${s.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
            <p style={{fontSize:14,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Quantity</p>
            <div style={{display:"flex",alignItems:"center",gap:16,marginLeft:"auto"}}>
              <button className="btn" onClick={()=>setQty(Math.max(1,qty-1))} style={{width:36,height:36,borderRadius:"50%",border:`1px solid ${TH.border}`,background:TH.bg2,fontSize:20,color:TH.text,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
              <span style={{fontSize:18,fontWeight:700,color:TH.text,minWidth:20,textAlign:"center"}}>{qty}</span>
              <button className="btn" onClick={()=>setQty(qty+1)} style={{width:36,height:36,borderRadius:"50%",border:"none",background:TH.accent,fontSize:20,color:TH.accentText,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
            </div>
          </div>
          <button className="btn" onClick={onAdd} style={{width:"100%",padding:16,borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:16,fontWeight:700,fontFamily:TH.headFont}}>Add to Cart · ${total.toFixed(2)}</button>
        </div>
        </div>{/* sheet-scroll */}
      </div>{/* sheet-wrap */}
    </div>
  );
}

// ─── CART ─────────────────────────────────────────────────────────────────────
function CartScreen({ TH, cart, updateQty, cartTotal, setScreen, service, setService, onCheckout, checkout, setCheckout, addToCart, openDish, clearCart }) {
  const tax=cartTotal*0.083, fee=cart.length>0?2.5:0, svc=service==="Takeaway"?1:service==="Delivery"?2.99:0, total=cartTotal+tax+fee+svc;
  const upsells=getUpsells(cart);

  if(checkout) return (
    <div style={{background:TH.bg,minHeight:"100vh",paddingBottom:100}}>
      <div style={{padding:"52px 20px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
          <button className="btn" onClick={()=>setCheckout(false)} style={{background:TH.bg2,border:"none",width:36,height:36,borderRadius:TH.btnRadius,fontSize:16,color:TH.text}}>←</button>
          <h1 style={{fontSize:20,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Checkout</h1>
        </div>
        <div style={{background:TH.bg2,borderRadius:TH.cardRadius,padding:16,marginBottom:14}}>
          <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:12,fontFamily:TH.headFont}}>Service options</p>
          {[{name:"Dine in",note:"No extra charge"},{name:"Takeaway",note:"+$1.00"},{name:"Delivery",note:"+$2.99"}].map(opt=>(
            <div key={opt.name} className="btn" onClick={()=>setService(opt.name)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:opt.name!=="Delivery"?`1px solid ${TH.border}`:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${service===opt.name?TH.accent:TH.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {service===opt.name&&<div style={{width:10,height:10,borderRadius:"50%",background:TH.accent}}/>}
                </div>
                <span style={{fontSize:14,color:TH.text}}>{opt.name}</span>
              </div>
              <span style={{fontSize:13,color:TH.text2}}>{opt.note}</span>
            </div>
          ))}
        </div>
        <div style={{background:TH.bg2,borderRadius:TH.cardRadius,padding:16,marginBottom:14}}>
          <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:10,fontFamily:TH.headFont}}>Payment</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={TH.text2} strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <span style={{fontSize:14,color:TH.text}}>•••• 4242</span>
            </div>
            <span style={{color:TH.text2}}>›</span>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"14px 0 20px"}}>
          <span style={{fontSize:16,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Total</span>
          <span style={{fontSize:18,fontWeight:800,color:TH.accent,fontFamily:TH.headFont}}>${total.toFixed(2)}</span>
        </div>
        <button className="btn" onClick={onCheckout} style={{width:"100%",padding:16,borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:16,fontWeight:700,fontFamily:TH.headFont}}>Place Order · ${total.toFixed(2)}</button>
        <p style={{fontSize:11,color:TH.text2,textAlign:"center",marginTop:10}}>By placing an order you agree to our Terms & Conditions</p>
      </div>
    </div>
  );

  return (
    <div style={{background:TH.bg,minHeight:"100vh",paddingBottom:100}}>
      <div style={{padding:"52px 20px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button className="btn" onClick={()=>setScreen("home")} style={{background:TH.bg2,border:"none",width:36,height:36,borderRadius:TH.btnRadius,fontSize:16,color:TH.text}}>←</button>
            <h1 style={{fontSize:20,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Your Cart</h1>
          </div>
          {cart.length>0&&<button onClick={clearCart} style={{background:"none",border:"none",color:TH.accent,fontSize:13,fontWeight:600,cursor:"pointer"}}>Clear all</button>}
        </div>
        {cart.length===0?(
          <div style={{textAlign:"center",padding:"60px 20px"}}>
            <div style={{width:90,height:90,borderRadius:"50%",background:TH.bg2,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={TH.text2} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            <p style={{fontSize:20,fontWeight:700,color:TH.text,fontFamily:TH.headFont,marginBottom:8}}>Your cart is empty</p>
            <p style={{fontSize:14,color:TH.text2,marginBottom:28}}>Add something delicious to get started</p>
            <button className="btn" onClick={()=>setScreen("home")} style={{padding:"12px 28px",borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:15,fontWeight:700,fontFamily:TH.headFont}}>Browse Menu</button>
          </div>
        ):(
          <>
            {cart.map((item,i)=>(
              <div key={item.id} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:`1px solid ${TH.border}`,animation:`fadeIn 0.3s ease ${i*50}ms both`}}>
                <div style={{width:68,height:68,borderRadius:TH.cardRadius,overflow:"hidden",flexShrink:0}}>
                  <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                </div>
                <div style={{flex:1}}>
                  <p style={{fontSize:14,fontWeight:600,color:TH.text,marginBottom:2,fontFamily:TH.headFont}}>{item.name}</p>
                  <p style={{fontSize:13,color:TH.accent,fontWeight:700,marginBottom:8}}>${item.price.toFixed(2)}</p>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <button className="btn" onClick={()=>updateQty(item.id,-1)} style={{width:28,height:28,borderRadius:"50%",border:`1px solid ${TH.border}`,background:TH.bg2,fontSize:16,color:TH.text,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontSize:14,fontWeight:600,color:TH.text}}>{item.qty}</span>
                    <button className="btn" onClick={()=>updateQty(item.id,1)} style={{width:28,height:28,borderRadius:"50%",border:"none",background:TH.accent,fontSize:16,color:TH.accentText,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"space-between"}}>
                  <button className="btn" onClick={()=>updateQty(item.id,-item.qty)} style={{background:"none",border:"none",color:TH.text2,fontSize:18}}>×</button>
                  <p style={{fontSize:15,fontWeight:700,color:TH.text}}>${(item.price*item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}

            {upsells.length>0&&(
              <div style={{marginTop:24,marginBottom:4}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <div style={{flex:1,height:1,background:TH.border}}/>
                  <p style={{fontSize:11,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",fontFamily:TH.headFont,whiteSpace:"nowrap"}}>Pairs Well With</p>
                  <div style={{flex:1,height:1,background:TH.border}}/>
                </div>
                {upsells.map((dish,i)=>(
                  <div key={dish.id} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:`1px solid ${TH.border}`,animation:`fadeIn 0.3s ease ${i*60}ms both`}}>
                    <div style={{width:54,height:54,borderRadius:TH.cardRadius,overflow:"hidden",flexShrink:0,cursor:"pointer"}} onClick={()=>openDish(dish)}>
                      <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover"}} />
                    </div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:13,fontWeight:600,color:TH.text,marginBottom:2,fontFamily:TH.headFont}}>{dish.name}</p>
                      <p style={{fontSize:12,color:TH.accent,fontWeight:700}}>${dish.price.toFixed(2)}</p>
                    </div>
                    <button className="btn" onClick={()=>addToCart(dish)} style={{alignSelf:"center",width:32,height:32,borderRadius:"50%",border:`1.5px solid ${TH.accent}`,background:"none",color:TH.accent,fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>+</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:"flex",gap:8,background:TH.bg2,borderRadius:TH.btnRadius,padding:"11px 16px",margin:"16px 0",alignItems:"center",border:`1px solid ${TH.border}`}}>
              <input placeholder="Promo code" style={{background:"none",border:"none",outline:"none",fontSize:14,color:TH.text,flex:1,fontFamily:TH.font}}/>
              <button style={{background:"none",border:"none",color:TH.accent,fontSize:13,fontWeight:700,cursor:"pointer"}}>Apply</button>
            </div>
            {[["Subtotal",cartTotal],["Service Fee",fee],["Tax (8.3%)",tax]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:14,color:TH.text2}}>{l}</span>
                <span style={{fontSize:14,color:TH.text}}>${v.toFixed(2)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 20px",borderTop:`1px solid ${TH.border}`,marginTop:4}}>
              <span style={{fontSize:16,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Total</span>
              <span style={{fontSize:18,fontWeight:800,color:TH.accent,fontFamily:TH.headFont}}>${total.toFixed(2)}</span>
            </div>
            <button className="btn" onClick={()=>setCheckout(true)} style={{width:"100%",padding:16,borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:16,fontWeight:700,fontFamily:TH.headFont}}>Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── FILTER SHEET ─────────────────────────────────────────────────────────────
function FilterSheet({ TH, onApply, onClose, current, visibleDishes }) {
  const [priceMax,setPriceMax]=useState(current.priceMax||60);
  const [calMax,setCalMax]=useState(current.calMax||1000);
  const [diets,setDiets]=useState(current.diets||[]);
  const [spice,setSpice]=useState(current.spice||null);
  const [popular,setPopular]=useState(current.popular||false);
  const [allergens,setAllergens]=useState(current.allergens||[]);

  const dietOpts=["Vegetarian","Vegan","High Protein","Keto","Pescatarian"];
  const allergenOpts=["Gluten Free","Dairy Free","Nut Free","Halal","Soy Free"];

  const liveCount=visibleDishes.filter(d=>{
    if(popular&&!d.popular) return false;
    if(priceMax<60&&d.price>priceMax) return false;
    if(calMax<1000&&d.cal>calMax) return false;
    if(diets.length>0&&!diets.every(t=>d.tags.includes(t))) return false;
    if(allergens.length>0&&!allergens.every(a=>d.tags.includes(a))) return false;
    if(spice&&d.spice!==spice) return false;
    return true;
  }).length;

  const totalActive=(priceMax<60?1:0)+(calMax<1000?1:0)+diets.length+(spice?1:0)+(popular?1:0)+allergens.length;
  const sbg=(v,mn,mx)=>{const p=Math.round(((v-mn)/(mx-mn))*100);return `linear-gradient(to right,${TH.accent} ${p}%,${TH.border} ${p}%)`;};
  const handleApply=()=>{if(liveCount===0)return;onApply({priceMax,calMax,diets,spice,popular,allergens});};
  const handleReset=()=>{setPriceMax(60);setCalMax(1000);setDiets([]);setSpice(null);setPopular(false);setAllergens([]);onApply({priceMax:60,calMax:1000,diets:[],spice:null,popular:false,allergens:[]});};

  return (
    <div>
      <div className="sheet-overlay" onClick={onClose}/>
      <div className="filter-wrap">
        <div className="sheet-scroll" style={{position:"relative",background:TH.bg,borderRadius:"24px 24px 0 0",maxHeight:"92vh",overflowY:"auto",animation:"slideUp 0.3s ease",padding:"20px 20px 44px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <h2 style={{fontSize:18,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Filters</h2>
            {totalActive>0&&<span style={{background:TH.accent,color:TH.accentText,fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{totalActive}</span>}
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:TH.text}}>×</button>
        </div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,padding:"14px 16px",background:TH.bg2,borderRadius:TH.cardRadius}}>
          <div><p style={{fontSize:14,fontWeight:600,color:TH.text,marginBottom:2}}>Popular only</p><p style={{fontSize:12,color:TH.text2}}>Show most ordered dishes</p></div>
          <button className="btn" onClick={()=>setPopular(!popular)} style={{width:46,height:26,borderRadius:13,border:"none",background:popular?TH.accent:TH.border,position:"relative"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:popular?23:3,transition:"left 0.25s ease"}}/>
          </button>
        </div>

        <SliderRow label="Max price" value={`$${priceMax}${priceMax>=60?"+":""}`} min={5} max={60} step={1} val={priceMax} onChange={setPriceMax} sbg={sbg} note={`Dishes up to $${priceMax}`} TH={TH}/>
        <SliderRow label="Max calories" value={calMax>=1000?"Any":`${calMax} cal`} min={100} max={1000} step={50} val={calMax} onChange={setCalMax} sbg={sbg} note="Light — Medium — Hearty" TH={TH}/>

        <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:10,fontFamily:TH.headFont}}>Dietary</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
          {dietOpts.map(d=><button key={d} className="btn" onClick={()=>setDiets(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d])} style={{padding:"8px 14px",borderRadius:TH.btnRadius,border:`1.5px solid ${diets.includes(d)?TH.accent:TH.border}`,background:diets.includes(d)?TH.accentLight:TH.bg2,color:diets.includes(d)?TH.accent:TH.text2,fontSize:13,fontWeight:diets.includes(d)?700:400}}>{diets.includes(d)?"✓ ":""}{d}</button>)}
        </div>

        <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:6,fontFamily:TH.headFont}}>Allergen free</p>
        <p style={{fontSize:12,color:TH.text2,marginBottom:10}}>Only show dishes free from these</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:22}}>
          {allergenOpts.map(a=><button key={a} className="btn" onClick={()=>setAllergens(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a])} style={{padding:"8px 14px",borderRadius:TH.btnRadius,border:`1.5px solid ${allergens.includes(a)?"#e65100":TH.border}`,background:allergens.includes(a)?"#fff3e0":TH.bg2,color:allergens.includes(a)?"#e65100":TH.text2,fontSize:13,fontWeight:allergens.includes(a)?700:400}}>{allergens.includes(a)?"✓ ":""}{a}</button>)}
        </div>

        <p style={{fontSize:14,fontWeight:700,color:TH.text,marginBottom:10,fontFamily:TH.headFont}}>Spice level</p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
          {["Mild","Medium","Hot","Extra Hot"].map(s=><button key={s} className="btn" onClick={()=>setSpice(spice===s?null:s)} style={{padding:"8px 16px",borderRadius:TH.btnRadius,border:`1.5px solid ${spice===s?TH.accent:TH.border}`,background:spice===s?TH.accentLight:TH.bg2,color:spice===s?TH.accent:TH.text2,fontSize:13,fontWeight:spice===s?700:400}}>{SPICE_ICON(s)} {s}</button>)}
        </div>

        <div style={{background:TH.bg2,borderRadius:TH.cardRadius,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <p style={{fontSize:22,fontWeight:800,color:liveCount===0?"#ef4444":TH.accent,fontFamily:TH.headFont}}>{liveCount} {liveCount===1?"dish":"dishes"}</p>
            <p style={{fontSize:12,color:TH.text2,marginTop:2}}>{liveCount===0?"No matches — try adjusting":"will appear in results"}</p>
          </div>
          <div style={{width:44,height:44,borderRadius:TH.cardRadius,background:liveCount===0?"#fef2f2":TH.accentLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={liveCount===0?"#ef4444":TH.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {liveCount===0?<><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>:<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="M9 12h6M9 16h4"/></>}
            </svg>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn" onClick={handleReset} style={{flex:1,padding:15,borderRadius:TH.btnRadius,border:`1px solid ${TH.border}`,background:TH.bg2,color:TH.text,fontSize:15,fontWeight:600}}>Reset</button>
          <button className="btn" onClick={handleApply} disabled={liveCount===0} style={{flex:2,padding:15,borderRadius:TH.btnRadius,border:"none",background:liveCount===0?TH.border:TH.accent,color:liveCount===0?TH.text2:TH.accentText,fontSize:15,fontWeight:700,opacity:liveCount===0?0.6:1}}>
            {liveCount===0?"No results":`See ${liveCount} ${liveCount===1?"dish":"dishes"} →`}
          </button>
        </div>
        </div>{/* sheet-scroll */}
      </div>{/* filter-wrap */}
    </div>
  );
}

function SliderRow({ label, value, min, max, step, val, onChange, sbg, note, TH }) {
  return (
    <div style={{marginBottom:26}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <p style={{fontSize:14,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>{label}</p>
        <span style={{fontSize:20,fontWeight:800,color:TH.accent,fontFamily:TH.headFont}}>{value}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:12,color:TH.text2,minWidth:20}}>{min}</span>
        <input type="range" min={min} max={max} step={step} value={val} onChange={e=>onChange(Number(e.target.value))} style={{flex:1,background:sbg(val,min,max),cursor:"pointer"}}/>
        <span style={{fontSize:12,color:TH.text2,minWidth:28,textAlign:"right"}}>{max}+</span>
      </div>
      <p style={{fontSize:11,color:TH.text2,textAlign:"center",marginTop:6}}>{note}</p>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminScreen({ TH, setScreen, themeId, setThemeId, fontId, setFontId, layout, setLayout, hiddenItems, setHiddenItems, hiddenCats, setHiddenCats }) {
  const [tab, setTab] = useState("dashboard");
  const [dishSearch, setDishSearch] = useState("");
  const [previewTheme, setPreviewTheme] = useState(themeId);
  const [previewFont,  setPreviewFont]  = useState(fontId);

  const toggleItem=(id)=>setHiddenItems(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  const toggleCat=(id)=>setHiddenCats(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });
  const LAYOUTS=[{id:"grid",label:"⊞ Grid",desc:"2-col cards with photos"},{id:"list",label:"≡ List",desc:"Full-width rows"},{id:"magazine",label:"▤ Magazine",desc:"Editorial hero images"},{id:"compact",label:"☰ Compact",desc:"Name & price only"}];
  const sortedThemes = [...Object.values(THEMES)].sort((a,b)=> a.id===previewTheme?-1:b.id===previewTheme?1:0);
  const recFonts = FONTS.filter(f=>(THEMES[previewTheme]?.recommended||[]).includes(f.id));
  const otherFonts = FONTS.filter(f=>!(THEMES[previewTheme]?.recommended||[]).includes(f.id));
  const sortedFonts = [...recFonts,...otherFonts];
  const filteredDishes = RAW_DISHES.filter(d=>d.name.toLowerCase().includes(dishSearch.toLowerCase()));
  const PTH = THEMES[previewTheme] || THEMES.studio;
  const PF  = FONTS.find(f=>f.id===previewFont) || FONTS[0];

  return (
    <div style={{background:TH.bg,minHeight:"100vh",paddingBottom:80}}>
      <div style={{padding:"52px 20px 16px",borderBottom:`1px solid ${TH.border}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{fontSize:20,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Dashboard</p>
            <p style={{fontSize:13,color:TH.text2}}>Ember & Rye</p>
          </div>
          <button className="btn" onClick={()=>setScreen("home")} style={{background:TH.bg2,border:`1px solid ${TH.border}`,borderRadius:TH.btnRadius,padding:"6px 14px",fontSize:13,color:TH.text,fontFamily:TH.font}}>Exit</button>
        </div>
      </div>

      <div style={{display:"flex",borderBottom:`1px solid ${TH.border}`}}>
        {["dashboard","menu","theme"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"12px 0",background:"none",border:"none",borderBottom:tab===t?`2.5px solid ${TH.accent}`:"2.5px solid transparent",color:tab===t?TH.accent:TH.text2,fontSize:13,fontWeight:tab===t?700:400,cursor:"pointer",textTransform:"capitalize",fontFamily:TH.font}}>{t}</button>
        ))}
      </div>

      <div style={{padding:20}}>
        {tab==="dashboard"&&<>
          <div style={{background:TH.bg2,borderRadius:TH.cardRadius,padding:16,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <p style={{fontSize:14,fontWeight:700,color:TH.text,fontFamily:TH.headFont}}>Menu profile</p>
              <p style={{fontSize:13,fontWeight:700,color:TH.accent}}>72% complete</p>
            </div>
            <div style={{height:8,background:TH.border,borderRadius:8,overflow:"hidden",marginBottom:8}}>
              <div style={{width:"72%",height:"100%",background:TH.accent,borderRadius:8}}/>
            </div>
            <p style={{fontSize:12,color:TH.text2,marginBottom:10}}>Add 5 more photos to boost engagement by 40%.</p>
            <button style={{padding:"8px 16px",borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:TH.font}}>Complete profile</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            {[["Views","1,248","▲ 12%",true],["Orders","86","▲ 8%",true],["Avg Order","$38.40","▲ $4.20",true],["Revenue","$3,302","▲ 15%",true]].map(([l,v,s,g])=>(
              <div key={l} style={{background:TH.bg2,borderRadius:TH.cardRadius,padding:14}}>
                <p style={{fontSize:11,color:TH.text2,marginBottom:4}}>{l}</p>
                <p style={{fontSize:18,fontWeight:700,color:TH.text,marginBottom:2,fontFamily:TH.headFont}}>{v}</p>
                <p style={{fontSize:10,color:g?"#16a34a":TH.text2}}>{s}</p>
              </div>
            ))}
          </div>
          <div style={{background:TH.accentLight,borderRadius:TH.cardRadius,padding:16,marginBottom:16,border:`1px solid ${TH.accent}33`}}>
            <p style={{fontSize:13,fontWeight:700,color:TH.accent,marginBottom:4,fontFamily:TH.headFont}}>Upsell Revenue This Month</p>
            <p style={{fontSize:26,fontWeight:800,color:TH.accent,fontFamily:TH.headFont,marginBottom:4}}>$847</p>
            <p style={{fontSize:12,color:TH.text2}}>Auto-generated from "Pairs Well With" in cart. Avg +$9.40 per table.</p>
          </div>
        </>}

        {tab==="menu"&&<>
          {/* Category toggles */}
          <p style={{fontSize:13,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:TH.headFont}}>Categories</p>
          {CATEGORIES_DEF.map(cat=>(
            <div key={cat.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${TH.border}`}}>
              <div style={{width:36,height:36,borderRadius:TH.cardRadius,overflow:"hidden",flexShrink:0}}>
                <img src={cat.img} alt={cat.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:hiddenCats.has(cat.id)?0.3:1}}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:14,fontWeight:600,color:hiddenCats.has(cat.id)?TH.text2:TH.text,fontFamily:TH.headFont}}>{cat.name}</p>
                <p style={{fontSize:11,color:TH.text2}}>{hiddenCats.has(cat.id)?"Hidden from customers":"Visible"}</p>
              </div>
              <button className="btn" onClick={()=>toggleCat(cat.id)} style={{width:44,height:24,borderRadius:12,border:"none",background:hiddenCats.has(cat.id)?TH.bg2:TH.accent,position:"relative"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,transition:"left 0.25s ease",left:hiddenCats.has(cat.id)?3:23}}/>
              </button>
            </div>
          ))}
          {/* Dish toggles */}
          <p style={{fontSize:13,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",margin:"20px 0 10px",fontFamily:TH.headFont}}>Dishes</p>
          {/* Dish search */}
          <div style={{display:"flex",gap:8,background:TH.bg2,borderRadius:TH.btnRadius,padding:"9px 14px",marginBottom:12,alignItems:"center",border:`1px solid ${TH.border}`}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TH.text2} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={dishSearch} onChange={e=>setDishSearch(e.target.value)} placeholder="Search dishes..." style={{background:"none",border:"none",outline:"none",fontSize:13,color:TH.text,flex:1,fontFamily:TH.font}}/>
            {dishSearch&&<button onClick={()=>setDishSearch("")} style={{background:"none",border:"none",color:TH.text2,fontSize:16,cursor:"pointer"}}>×</button>}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:TH.cardRadius,border:`2px dashed ${TH.border}`,background:"none",color:TH.accent,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:12,fontFamily:TH.font}}>+ Add New Dish</button>
          {filteredDishes.map((dish,i)=>(
            <div key={dish.id} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:`1px solid ${TH.border}`,animation:`fadeIn 0.3s ease ${i*20}ms both`}}>
              <div style={{width:44,height:44,borderRadius:TH.cardRadius,overflow:"hidden",flexShrink:0}}>
                <img src={dish.img} alt={dish.name} style={{width:"100%",height:"100%",objectFit:"cover",opacity:hiddenItems.has(dish.id)?0.3:1}} />
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{fontSize:13,fontWeight:600,color:hiddenItems.has(dish.id)?TH.text2:TH.text,fontFamily:TH.headFont,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{dish.name}</p>
                <p style={{fontSize:11,color:TH.accent}}>${dish.price.toFixed(2)} · {hiddenItems.has(dish.id)?"Hidden":"Visible"}</p>
              </div>
              <button className="btn" onClick={()=>toggleItem(dish.id)} style={{width:44,height:24,borderRadius:12,border:"none",background:hiddenItems.has(dish.id)?TH.bg2:TH.accent,position:"relative",flexShrink:0}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,transition:"left 0.25s ease",left:hiddenItems.has(dish.id)?3:23}}/>
              </button>
            </div>
          ))}
        </>}

        {tab==="theme"&&<>
          {/* ── LAYOUT ── */}
          <p style={{fontSize:11,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:TH.headFont}}>Menu Layout</p>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:18,scrollbarWidth:"none"}}>
            {LAYOUTS.map(l=>(
              <div key={l.id} onClick={()=>setLayout(l.id)} style={{flexShrink:0,padding:"10px 14px",borderRadius:TH.cardRadius,cursor:"pointer",border:layout===l.id?`2px solid ${TH.accent}`:`1px solid ${TH.border}`,background:layout===l.id?TH.accentLight:TH.bg2,minWidth:80,textAlign:"center"}}>
                <p style={{fontSize:18,marginBottom:3}}>{l.label.split(" ")[0]}</p>
                <p style={{fontSize:10,color:layout===l.id?TH.accent:TH.text2,fontWeight:layout===l.id?700:400}}>{l.label.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>

          <div style={{height:1,background:TH.border,marginBottom:18}}/>

          {/* ── COLOR THEME — selected floats to front ── */}
          <p style={{fontSize:11,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:TH.headFont}}>Color Theme</p>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:18,scrollbarWidth:"none"}}>
            {sortedThemes.map(th=>(
              <div key={th.id} onClick={()=>setPreviewTheme(th.id)} style={{flexShrink:0,width:76,cursor:"pointer",borderRadius:10,overflow:"hidden",border:previewTheme===th.id?`2px solid ${TH.accent}`:`1px solid ${TH.border}`,transition:"all 0.2s"}}>
                <div style={{height:42,background:th.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,position:"relative"}}>
                  {th.emoji}
                  {previewTheme===th.id&&<div style={{position:"absolute",top:4,right:4,width:14,height:14,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke={th.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                </div>
                <div style={{padding:"5px 6px",background:th.bg,borderTop:`1px solid ${th.border}`}}>
                  <p style={{fontSize:9,fontWeight:previewTheme===th.id?700:400,color:th.text,textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{th.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{height:1,background:TH.border,marginBottom:18}}/>

          {/* ── FONT — recommended floats to front ── */}
          <p style={{fontSize:11,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:6,fontFamily:TH.headFont}}>Font</p>
          <p style={{fontSize:11,color:TH.text2,marginBottom:10}}>✓ Recommended fonts for this theme appear first</p>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,marginBottom:18,scrollbarWidth:"none"}}>
            {sortedFonts.map(f=>{
              const isRec=(THEMES[previewTheme]?.recommended||[]).includes(f.id);
              const isActive=previewFont===f.id;
              return (
                <div key={f.id} onClick={()=>setPreviewFont(f.id)} style={{flexShrink:0,padding:"10px 12px",borderRadius:TH.cardRadius,cursor:"pointer",border:isActive?`2px solid ${TH.accent}`:isRec?`1px solid ${TH.accent}66`:`1px solid ${TH.border}`,background:isActive?TH.accentLight:isRec?TH.bg2:TH.bg2,minWidth:110,position:"relative"}}>
                  {isRec&&<span style={{position:"absolute",top:-7,left:8,fontSize:8,fontWeight:700,padding:"1px 6px",borderRadius:8,background:TH.accent,color:TH.accentText}}>✓ Best</span>}
                  <p style={{fontSize:13,fontWeight:600,color:isActive?TH.accent:TH.text,fontFamily:f.family,marginBottom:2}}>{f.name}</p>
                  <p style={{fontSize:9,color:TH.text2,fontFamily:f.family}}>{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{height:1,background:TH.border,marginBottom:18}}/>

          {/* ── RICH PREVIEW ── */}
          <p style={{fontSize:11,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:10,fontFamily:TH.headFont}}>Live Preview</p>
          <div style={{background:PTH.bg,borderRadius:16,overflow:"hidden",border:`2px solid ${TH.border}`,marginBottom:14,boxShadow:"0 8px 32px rgba(0,0,0,0.12)"}}>
            {/* Mock top bar */}
            <div style={{background:PTH.navBg,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${PTH.border}`}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:PTH.bg2,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={PTH.text2} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <p style={{fontSize:11,fontWeight:700,color:PTH.text,letterSpacing:2,textTransform:"uppercase",fontFamily:PF.family}}>Ember & Rye</p>
              <div style={{width:22,height:22,borderRadius:"50%",background:PTH.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={PTH.accentText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
              </div>
            </div>
            {/* Mock hero */}
            <div style={{height:80,background:`linear-gradient(135deg,${PTH.accent},${PTH.accent}99)`,display:"flex",alignItems:"center",padding:"0 16px",position:"relative"}}>
              <div>
                <p style={{fontSize:9,color:"rgba(255,255,255,0.7)",letterSpacing:2,textTransform:"uppercase",fontFamily:PF.family}}>Featured tonight</p>
                <p style={{fontSize:15,fontWeight:700,color:"#fff",fontFamily:PF.family}}>Wagyu Smash Burger</p>
                <p style={{fontSize:13,fontWeight:800,color:"#fff",fontFamily:PF.family}}>$19.99</p>
              </div>
              <div style={{position:"absolute",right:16,padding:"6px 12px",borderRadius:PTH.btnRadius,background:"rgba(255,255,255,0.2)",border:"1px solid rgba(255,255,255,0.4)"}}>
                <p style={{fontSize:9,fontWeight:700,color:"#fff",fontFamily:PF.family}}>View dish</p>
              </div>
            </div>
            {/* Mock category row */}
            <div style={{padding:"10px 12px",background:PTH.bg2,display:"flex",gap:6,borderBottom:`1px solid ${PTH.border}`}}>
              {["All","Popular","Mains","Pizza"].map((c,i)=>(
                <div key={c} style={{padding:"4px 10px",borderRadius:PTH.btnRadius,background:i===0?PTH.accent:PTH.bg,border:`1px solid ${i===0?PTH.accent:PTH.border}`}}>
                  <p style={{fontSize:9,fontWeight:700,color:i===0?PTH.accentText:PTH.text2,fontFamily:PF.family}}>{c}</p>
                </div>
              ))}
            </div>
            {/* Mock dish cards */}
            <div style={{padding:"10px 12px",background:PTH.bg,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[{n:"Truffle Pasta",p:"$20.99",tag:"Vegetarian"},{n:"Grilled Salmon",p:"$26.99",tag:"High Protein"},{n:"Wagyu Ribeye",p:"$58.99",tag:"Keto"},{n:"Lava Cake",p:"$10.99",tag:"Popular"}].map(item=>(
                <div key={item.n} style={{background:PTH.card,borderRadius:PTH.cardRadius,overflow:"hidden",border:`1px solid ${PTH.border}`}}>
                  <div style={{height:44,background:`linear-gradient(135deg,${PTH.accent}88,${PTH.accent}44)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🍽️</div>
                  <div style={{padding:"6px 8px"}}>
                    <p style={{fontSize:9,fontWeight:700,color:PTH.text,fontFamily:PF.family,marginBottom:2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.n}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <p style={{fontSize:10,fontWeight:800,color:PTH.accent,fontFamily:PF.family}}>{item.p}</p>
                      <div style={{width:16,height:16,borderRadius:"50%",background:PTH.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <p style={{fontSize:11,fontWeight:700,color:PTH.accentText,lineHeight:1}}>+</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Theme + font label */}
            <div style={{padding:"8px 12px",background:PTH.bg2,borderTop:`1px solid ${PTH.border}`,display:"flex",justifyContent:"space-between"}}>
              <p style={{fontSize:9,color:PTH.text2,fontFamily:PF.family}}>{THEMES[previewTheme]?.name}</p>
              <p style={{fontSize:9,color:PTH.text2,fontFamily:PF.family}}>{PF.name}</p>
            </div>
          </div>
          <button className="btn" onClick={()=>{setThemeId(previewTheme);setFontId(previewFont);}} style={{width:"100%",padding:13,borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:14,fontWeight:700,fontFamily:TH.font}}>
            Apply Changes
          </button>
        </>}
      </div>
    </div>
  );
}

// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────
function SearchOverlay({ TH, search, setSearch, onClose, onSearch }) {
  const [val, setVal] = useState(search);
  const inputRef = useState(null);

  const quickTags = [
    {label:"Burgers",      q:"burgers"},
    {label:"Spicy",        q:"spicy"},
    {label:"Vegetarian",   q:"vegetarian"},
    {label:"Vegan",        q:"vegan"},
    {label:"Pizza",        q:"pizza"},
    {label:"Seafood",      q:"salmon"},
    {label:"Desserts",     q:"desserts"},
    {label:"Drinks",       q:"drinks"},
    {label:"Sides",        q:"sides"},
    {label:"High Protein", q:"high protein"},
  ];

  const handleSubmit = () => { if(val.trim()) onSearch(val.trim()); };

  return (
    <div>
      <div className="sheet-overlay" onClick={onClose}/>
      <div className="sheet-wrap" style={{justifyContent:"flex-start"}}>
        <div className="sheet-scroll" style={{position:"relative",background:TH.bg,borderRadius:"0 0 24px 24px",paddingBottom:32,animation:"slideDown 0.3s ease"}}>
          <style>{`@keyframes slideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}`}</style>

          {/* Search input */}
          <div style={{padding:"52px 20px 16px"}}>
            <p style={{fontSize:22,fontWeight:700,color:TH.text,fontFamily:TH.headFont,marginBottom:4}}>
              What are you craving?
            </p>
            <p style={{fontSize:14,color:TH.text2,marginBottom:20}}>Search by dish name, ingredient or dietary need</p>
            <div style={{display:"flex",gap:10,background:TH.bg2,borderRadius:TH.btnRadius,padding:"12px 16px",alignItems:"center",border:`2px solid ${TH.accent}`}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TH.accent} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                autoFocus
                value={val}
                onChange={e=>setVal(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleSubmit()}
                placeholder="e.g. truffle pasta, vegan, spicy..."
                style={{background:"none",border:"none",outline:"none",fontSize:15,color:TH.text,flex:1,fontFamily:TH.font}}
              />
              {val&&<button onClick={()=>setVal("")} style={{background:"none",border:"none",color:TH.text2,fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>}
            </div>
            {val&&(
              <button className="btn" onClick={handleSubmit} style={{width:"100%",marginTop:12,padding:13,borderRadius:TH.btnRadius,border:"none",background:TH.accent,color:TH.accentText,fontSize:15,fontWeight:700,fontFamily:TH.headFont}}>
                Search "{val}"
              </button>
            )}
          </div>

          {/* Quick suggestions */}
          <div style={{padding:"0 20px"}}>
            <p style={{fontSize:12,fontWeight:700,color:TH.text2,letterSpacing:1,textTransform:"uppercase",marginBottom:12,fontFamily:TH.headFont}}>Quick picks</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {quickTags.map(tag=>(
                <button key={tag.q} className="btn" onClick={()=>onSearch(tag.q)} style={{padding:"8px 14px",borderRadius:TH.btnRadius,border:`1px solid ${TH.border}`,background:TH.bg2,color:TH.text,fontSize:13,fontFamily:TH.font}}>
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
// ─── DISH EMOJI + GRADIENT MAP ───────────────────────────────────────────────
const DISH_VISUAL = {
  burgers:  { emoji:"🍔", grad:"linear-gradient(135deg,#c0622a,#e8854a)" },
  pizza:    { emoji:"🍕", grad:"linear-gradient(135deg,#c0392b,#e74c3c)" },
  starters: { emoji:"🥗", grad:"linear-gradient(135deg,#7c5cbf,#9b7fd4)" },
  mains:    { emoji:"🍽️", grad:"linear-gradient(135deg,#d4730a,#f39c12)" },
  bowls:    { emoji:"🥙", grad:"linear-gradient(135deg,#0891b2,#22b8d1)" },
  sides:    { emoji:"🍟", grad:"linear-gradient(135deg,#b45309,#d97706)" },
  desserts: { emoji:"🍰", grad:"linear-gradient(135deg,#db2777,#ec4899)" },
  drinks:   { emoji:"🍹", grad:"linear-gradient(135deg,#059669,#10b981)" },
  popular:  { emoji:"⭐", grad:"linear-gradient(135deg,#c9a84c,#f0c85a)" },
};
function getDishVisual(dish) {
  for (const cat of ["burgers","pizza","starters","mains","bowls","desserts","drinks"]) {
    if (dish.cat.includes(cat)) return DISH_VISUAL[cat];
  }
  return DISH_VISUAL.popular;
}

function FilterIcon({ color }) {
  return <svg width="18" height="15" viewBox="0 0 18 15" fill="none"><line x1="0" y1="1.5" x2="18" y2="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="13" cy="1.5" r="2.5" fill={color}/><line x1="0" y1="7.5" x2="18" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="5" cy="7.5" r="2.5" fill={color}/><line x1="0" y1="13.5" x2="18" y2="13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13.5" r="2.5" fill={color}/></svg>;
}
function NavIcon({ id, active, color }) {
  const c=active?color:"#888"; const s={width:22,height:22};
  if(id==="home")  return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
  if(id==="cart")  return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
  if(id==="share") return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
  if(id==="admin") return <svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
}
function BottomNav({ screen, setScreen, cartCount, TH }) {
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:TH.navBg,borderTop:`1px solid ${TH.border}`,display:"flex",paddingBottom:20,zIndex:50}}>
      {["home","cart","share","admin"].map(id=>(
        <button key={id} className="btn" onClick={()=>id!=="share"&&setScreen(id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"10px 0",background:"none",border:"none",position:"relative"}}>
          <NavIcon id={id} active={screen===id} color={TH.accent}/>
          <span style={{fontSize:10,color:screen===id?TH.accent:TH.id==="upscale"?"#555":"#999",fontWeight:screen===id?700:400,fontFamily:TH.font,textTransform:"capitalize"}}>{id==="admin"?"Admin":id.charAt(0).toUpperCase()+id.slice(1)}</span>
          {id==="cart"&&cartCount>0&&<span style={{position:"absolute",top:6,right:"calc(50% - 18px)",background:TH.accent,color:TH.accentText,borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{cartCount}</span>}
        </button>
      ))}
    </div>
  );
}
