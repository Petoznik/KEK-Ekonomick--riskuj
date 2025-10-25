const QUESTION_BANK = {
    Historie: {
        100: {
            question: "Kdy začala druhá světová válka?",
            answers: ["1914", "1939", "1945", "1929"],
            correct: 1
        },
        200: {
            question: "Kdo byl prvním československým prezidentem?",
            answers: ["Tomáš G. Masaryk", "Edvard Beneš", "Klement Gottwald", "Václav Havel"],
            correct: 0
        },
        300: {
            question: "Ve kterém roce proběhla sametová revoluce?",
            answers: ["1989", "1968", "1993", "1975"],
            correct: 0
        },
        400: {
            question: "Jaké město bylo centrem Byzantské říše?",
            answers: ["Řím", "Alexandrie", "Konstantinopol", "Athény"],
            correct: 2
        },
        500: {
            question: "Který panovník zahájil vládu Tudorovců?",
            answers: ["Jindřich VII.", "Jindřich VIII.", "Alžběta I.", "Eduard VI."],
            correct: 0
        }
    },
    Věda: {
        100: {
            question: "Jaký prvek má chemickou značku O?",
            answers: ["Osmium", "Vodík", "Zlato", "Kyslík"],
            correct: 3
        },
        200: {
            question: "Kolik planet má Sluneční soustava?",
            answers: ["7", "8", "9", "10"],
            correct: 1
        },
        300: {
            question: "Kdo formuloval teorii relativity?",
            answers: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Marie Curie"],
            correct: 1
        },
        400: {
            question: "Jaký je symbol pro gravitační zrychlení na Zemi?",
            answers: ["g", "F", "v", "a"],
            correct: 0
        },
        500: {
            question: "Jaký je největší orgán v lidském těle?",
            answers: ["Plíce", "Pokožka", "Játra", "Mozek"],
            correct: 1
        }
    },
    Kultura: {
        100: {
            question: "Který skladatel napsal operu Libuše?",
            answers: ["Bedřich Smetana", "Antonín Dvořák", "Leoš Janáček", "Zdeněk Fibich"],
            correct: 0
        },
        200: {
            question: "Jak se jmenuje hlavní postava románu Babička?",
            answers: ["Božena", "Barunka", "Kristla", "Terezka"],
            correct: 1
        },
        300: {
            question: "Který režisér natočil film Amadeus?",
            answers: ["Miloš Forman", "Jiří Menzel", "Roman Polanski", "Stanley Kubrick"],
            correct: 0
        },
        400: {
            question: "Jaké je rodné jméno spisovatele Kafky?",
            answers: ["František", "Franz", "Friedrich", "Felix"],
            correct: 1
        },
        500: {
            question: "Která socha stojí na Karlově mostě u Malostranské věže?",
            answers: ["Jan Nepomucký", "Sv. Václav", "Sv. Josef", "Sv. Ludmila"],
            correct: 0
        }
    },
    Sport: {
        100: {
            question: "Kolik hráčů je v poli u fotbalu?",
            answers: ["9", "10", "11", "12"],
            correct: 2
        },
        200: {
            question: "Který sport se hraje na Roland Garros?",
            answers: ["Tenis", "Golf", "Basketbal", "Rugby"],
            correct: 0
        },
        300: {
            question: "Kdo drží rekord v počtu olympijských zlatých medailí?",
            answers: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Larisa Latynina"],
            correct: 1
        },
        400: {
            question: "Kolik minut trvá regulérní zápas ledního hokeje?",
            answers: ["45", "50", "60", "70"],
            correct: 2
        },
        500: {
            question: "Který tým vyhrál první ročník NHL?",
            answers: ["Montreal Canadiens", "Toronto Arenas", "Boston Bruins", "Detroit Red Wings"],
            correct: 1
        }
    },
    Technologie: {
        100: {
            question: "Jaký je název nejrozšířenějšího operačního systému pro osobní počítače?",
            answers: ["macOS", "Linux", "Windows", "Chrome OS"],
            correct: 2
        },
        200: {
            question: "Co znamená zkratka HTML?",
            answers: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Tool Multi Language"
            ],
            correct: 0
        },
        300: {
            question: "Která společnost vyvinula programovací jazyk Python?",
            answers: ["Microsoft", "Guido van Rossum", "Google", "IBM"],
            correct: 1
        },
        400: {
            question: "Co označuje zkratka AI?",
            answers: ["Automatizovaná integrace", "Umělá inteligence", "Pokročilá inovace", "Analytická inference"],
            correct: 1
        },
        500: {
            question: "Jak se jmenuje první počítačový virus?",
            answers: ["ILOVEYOU", "Creeper", "Melissa", "Brain"],
            correct: 1
        }
    }
};

const GAME_CONFIGS = {
    default: {
        hero: {
            title: "Riskuj: Moderní týmová soutěž",
            description:
                "Připrav se na vzrušující hru plnou napětí! Vyber si počet týmů, vyzvi protihráče a ukaž, kdo má největší znalosti. Čas běží!"
        },
        categories: ["Historie", "Věda", "Kultura", "Sport", "Technologie"],
        overrides: {}
    },
    "1": {
        hero: {
            title: "Riskuj: 1. ročník",
            description: "Otázky přizpůsobené pro první ročník. Správná volba pro start!"
        },
        categories: ["Čeština", "Matematika", "Přírodopis", "Dějepis", "Zábava"],
        overrides: {
            Čeština: QUESTION_BANK.Historie,
            Matematika: QUESTION_BANK.Věda,
            Přírodopis: QUESTION_BANK.Kultura,
            Dějepis: QUESTION_BANK.Historie,
            Zábava: QUESTION_BANK.Technologie
        }
    },
    "2": {
        hero: {
            title: "Riskuj: 2. ročník",
            description: "Vyšší obtížnost pro druhý ročník. Připrav se na výzvy!"
        },
        categories: ["Literatura", "Fyzika", "Chemie", "Geografie", "Hudba"],
        overrides: {
            Literatura: QUESTION_BANK.Kultura,
            Fyzika: QUESTION_BANK.Věda,
            Chemie: QUESTION_BANK.Technologie,
            Geografie: QUESTION_BANK.Sport,
            Hudba: QUESTION_BANK.Kultura
        }
    },
    "3": {
        hero: {
            title: "Riskuj: 3. ročník",
            description: "Zaměřeno na všeobecné znalosti třetího ročníku."
        },
        categories: ["Filozofie", "Biologie", "Informatika", "Ekonomie", "Kultura"],
        overrides: {
            Filozofie: QUESTION_BANK.Historie,
            Biologie: QUESTION_BANK.Věda,
            Informatika: QUESTION_BANK.Technologie,
            Ekonomie: QUESTION_BANK.Sport,
            Kultura: QUESTION_BANK.Kultura
        }
    },
    "4": {
        hero: {
            title: "Riskuj: 4. ročník",
            description: "Nejtěžší otázky pro maturanty. Podaří se ti zvítězit?"
        },
        categories: ["Literatura", "Matematická analýza", "Společenské vědy", "Historie", "Technologie"],
        overrides: {
            Literatura: QUESTION_BANK.Kultura,
            "Matematická analýza": QUESTION_BANK.Věda,
            "Společenské vědy": QUESTION_BANK.Historie,
            Historie: QUESTION_BANK.Historie,
            Technologie: QUESTION_BANK.Technologie
        }
    }
};

function loadGameConfig() {
    const params = new URLSearchParams(window.location.search);
    const grade = params.get("grade") ?? "default";
    const topic = params.get("topic");

    const selectedConfig = GAME_CONFIGS[grade] ?? GAME_CONFIGS.default;

    const heroTitle = document.getElementById("hero-title");
    const heroDescription = document.getElementById("hero-description");

    if (heroTitle) heroTitle.textContent = selectedConfig.hero.title;
    if (heroDescription) heroDescription.textContent = selectedConfig.hero.description;

    return {
        grade,
        topic,
        categories: selectedConfig.categories,
        overrides: selectedConfig.overrides,
        metadata: selectedConfig.hero
    };
}
