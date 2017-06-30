var neighborhoods = ["Regis", "Berkeley","West Highland", "Sloans Lake", "West Colfax", "Villa Park", "Barnum West", "Barnum","Westwood", "Mar Lee", "Harvey Park", "Harvey Park South", "Bear Valley","Fort Logan","Marston", "Chaffee Park", "Sunnyside",  "Highland", "Jefferson Park", "Sun Valley","Valverde", "Athmar Park", "Ruby Hill",  "College View", "South Platte", "Globeville","Five Points", "Union Station", "Auraria", "Downtown", "North Capital Hill", "Lincoln Park", "Civic Center", "Capital Hill", "Baker", "Speer", "Washington Park West", "Overland", "Platt Park", "Rosedale", "Elyria Swansea", "Cole", "Whittier", "City Park West", "Cheeseman Park", "Country Club", "Washington Park", "University", "Clayton", "Skyland", "City Park", "CongressPark", "Cherry Creek","Belcard", "Cory-Merrill", "University Park", "Wellshire", "Northeast Park Hill", "North Park Hill","South Park Hill", "Hale", "Montclair","Hilltop", "Washington Virginia Vale", "Virginia Vilage", "Goldsmith", "Hampden", "University Hills", "Southmoor Park", "Hampden South", "Stapleton", "East Colfax", "Lowry Field", "Windsor", "Indian Creek", "MontBello", "Denver International Airport", "Gateway/Green Valley Ranch", "Gateway/Green Valley Ranch", "Kennedy"];
  
  var coorArray=[39.79139103352651, -105.0619125366211,39.786114786541, -105.02655029296875, 39.782421172884675, -105.05126953125,39.771339142289, -105.02689361572266,39.76922807700863, -105.05332946777344,39.75999140525313, -105.02620697021484,39.758671779569404, -105.05367279052734,39.746002086476544, -105.02552032470703, 39.743890244410395, -105.05401611328125,39.736234274337846, -105.02620697021484, 39.734650174341866, -105.05332946777344, 39.72672912827311, -105.02620697021484, 39.72567292003209, -105.05367279052734, 39.71246895189433, -105.040283203125, 39.72567292003209, -105.03890991210938, 39.712204846746694, -105.02620697021484, 39.71114841604473, -105.05401611328125, 39.69794166727414, -105.02586364746094, 39.69662085337442, -105.05401611328125, 39.6831471078718, -105.02586364746094, 39.68076911511416, -105.05538940429688, 39.66755655314589, -105.02689361572266, 39.66782082915173, -105.05435943603516, 39.655663086684065, -105.02826690673828, 39.66940646395886, -105.08216857910156, 39.65196247966375, -105.05573272705078, 39.64984775813506, -105.06397247314453, 39.63451409257392, -105.03547668457031, 39.63821563347804, -105.08628845214844, 39.61573894281141, -105.05744934082031, 39.791127230787914, -105.0241470336914, 39.78374034338062, -104.99942779541016, 39.78347651130465, -105.02483367919922, 39.77081138203805, -105.00011444091797, 39.77001973407519, -105.02483367919922, 39.75999140525313, -105.00389099121094, 39.75840785139829, -105.02552032470703, 39.74573810975803, -105.01659393310547, 39.74679401056389, -105.02552032470703, 39.72620102617506, -105.01762390136719, 39.724880753233414, -105.02483367919922, 39.713789462465364, -105.00629425048828, 39.71246895189433, -105.0241470336914, 39.69688501817643, -104.99427795410156, 39.6958283529021, -105.02483367919922, 39.68235445271773, -105.0021743774414, 39.68209023231117, -105.02552032470703, 39.662006523520596, -105.01659393310547, 39.68209023231117, -105.00835418701172, 39.66147792602166, -105.00045776367188,39.79033581650222, -104.9966812133789, 39.77160302089718, -104.97917175292969, 39.76817252009201, -104.99496459960938, 39.75154536393759, -104.97505187988281, 39.759199632877234, -105.00526428222656, 39.75048953595117, -104.9966812133789, 39.74943369178247, -105.01522064208984,39.741778337617866, -104.99977111816406,39.749697654341716, -104.99977111816406,39.74204232950661, -104.98878479003906,39.74864179803635, -104.98741149902344,39.740986355883564, -104.974365234375, 39.740986355883564, -105.01728057861328,39.72699317780526, -104.99702453613281, 39.74072235994946, -104.9966812133789,39.72699317780526, -104.98809814453125,39.74045836300403, -104.98603820800781,39.72831341029745, -104.97367858886719,39.72514480984419, -105.00560760498047,39.70454535762547, -104.98878479003906,  39.727521273835855, -104.98638153076172,39.7132612612704, -104.9740219116211,39.71114841604473, -104.98706817626953,39.69741334474737, -104.9740219116211,39.693979149747264, -104.99942779541016,39.66834937813084, -104.98878479003906,39.69688501817643, -104.98809814453125,39.680240661158805, -104.974365234375,39.67865527503048, -104.98809814453125,39.66861365110414, -104.97505187988281, 39.79086342703768, -104.97745513916016, 39.77371401334739, -104.9410629272461, 39.773186271304056, -104.97196197509766, 39.7636862226434, -104.96028900146484, 39.76210275375139, -104.97230529785156, 39.75207327186239, -104.95960235595703, 39.75022557642607, -104.9740219116211, 39.740986355883564, -104.96063232421875, 39.73966636609981, -104.97333526611328, 39.73016169331405, -104.96200561523438, 39.7291055376578, -104.97299194335938, 39.715638134796336, -104.96028900146484, 39.71643040777075, -104.97264862060547, 39.68578922600667, -104.96028900146484, 39.68737444836129, -104.97367858886719, 39.66227082075381, -104.95994567871094, 39.7729223987651, -104.9582290649414, 39.76263058076128, -104.94071960449219, 39.76263058076128, -104.95960235595703, 39.75207327186239, -104.94071960449219, 39.75128140845808, -104.95960235595703, 39.74151434471776, -104.9410629272461, 39.74072235994946, -104.95857238769531, 39.72672912827311, -104.94140625, 39.72567292003209, -104.95960235595703, 39.71273305603083, -104.9410629272461, 39.71273305603083, -104.95960235595703, 39.69714918196742, -104.94209289550781, 39.696092520737224, -104.95891571044922, 39.684468179576236, -104.94071960449219, 39.68393975392731, -104.9582290649414,39.66861365110414, -104.94209289550781,39.66914219401813, -104.95960235595703,39.655134440667396, -104.94209289550781,39.78848914776114, -104.94003295898438,39.76263058076128, -104.90398406982422,39.76289449274903, -104.94037628173828,39.7523372243077, -104.90398406982422,39.7523372243077, -104.94037628173828,39.74045836300403, -104.90398406982422,39.74072235994946, -104.94071960449219,39.72620102617506, -104.92321014404297,39.74045836300403, -104.92218017578125,39.72620102617506, -104.90432739257812,39.72567292003209, -104.94037628173828,39.71273305603083, -104.91050720214844,39.71088430584141, -104.93144989013672,39.69450749856092, -104.9032974243164,39.696092520737224, -104.94037628173828,39.679712203159745, -104.90570068359375,39.67865527503048, -104.92938995361328,39.66808510414672, -104.90467071533203,39.66782082915173, -104.91840362548828,39.65434146406167, -104.86896514892578,39.66914219401813, -104.93968963623047,39.65487011614291, -104.92012023925781,39.65275548355981, -104.93179321289062,39.62525937371229, -104.91222381591797,39.65328414777011, -104.91222381591797,39.624466054492345, -104.886474609375, 39.79798577319723, -104.90364074707031,39.75603245234358, -104.86656188964844,39.74864179803635, -104.9029541015625,39.733066037939444, -104.88578796386719,39.73280201166623, -104.90226745605469,39.71246895189433, -104.87239837646484,39.70982785491674, -104.90226745605469,39.69794166727414, -104.8696517944336,39.692658260020266, -104.90364074707031,39.679712203159745, -104.89574432373047,39.798249549632104, -104.86347198486328,39.7750333507536, -104.81163024902344,39.813810568514526, -104.8092269897461,39.79930464525454, -104.7711181640625,39.79798577319723, -104.80854034423828,39.7729223987651, -104.77249145507812,39.798249549632104, -104.7711181640625, 39.77081138203805, -104.73403930664062, 39.6598921092657, -104.86656188964844, 39.65011210186371, -104.85008239746094];
