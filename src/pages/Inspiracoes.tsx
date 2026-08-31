import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BackButton from "@/components/BackButton";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const inspiracoes = [
  {
    name: "Cheikh Anta Diop",
    works: [
      "The African Origin of Civilization: Myth or Reality",
      "Precolonial Black Africa",
      "Black Africa: The Economic and Cultural Basis for a Federated State",
      "Civilization or Barbarism: An Authentic Anthropology",
      "The Cultural Unity of Black Africa",
      "Antériorité des civilisations nègres: mythe ou vérité historique?",
      "Nations nègres et culture",
      "L’Afrique noire précoloniale",
      "Les fondements économiques et culturels d’un État fédéral d’Afrique noire",
      "Physique nucléaire et chronologie absolue",
    ],
  },
  {
    name: "Joseph Ki-Zerbo",
    note: "Acompanhar a historiografia africana produzida a partir do próprio continente.",
    works: [
      "History of Black Africa",
      "UNESCO General History of Africa — editor/contributor, especialmente Vols. I–VIII",
      "When the Bullet Speaks: A Story of the Burkinabè Revolution",
      "À quand l’Afrique? (When Africa Will Be?)",
      "Histoire de l’Afrique noire: d’hier à demain",
      "La natte des autres: pour un développement endogène en Afrique",
      "Regards d’Afrique",
    ],
  },
  {
    name: "Frantz Fanon",
    works: [
      "Black Skin, White Masks",
      "A Dying Colonialism",
      "The Wretched of the Earth",
      "Toward the African Revolution",
      "L’An V de la révolution algérienne",
      "Peau noire, masques blancs",
      "Les Damnés de la Terre",
      "Pour la révolution africaine",
      "Écrits sur l’aliénation et la liberté — textos, cartas e escritos diversos",
    ],
  },
  {
    name: "Kwame Nkrumah",
    note: "Especial para o panafricanismo, neocolonialismo, consciencismo e economia política.",
    works: [
      "Consciencism",
      "Neo-Colonialism: The Last Stage of Imperialism",
      "Africa Must Unite",
      "I Speak of Freedom",
      "Dark Days in Ghana",
      "Revolutionary Path",
      "Handbook of Revolutionary Warfare",
      "Towards Colonial Freedom",
      "Ghana: The Autobiography of Kwame Nkrumah",
      "Class Struggle in Africa",
      "The Struggle Continues",
    ],
  },
  {
    name: "Bethwell Allan Ogot",
    note: "Particularmente importante para África Oriental, história oral, historiografia e formação histórica do Quênia.",
    works: [
      "History of the Southern Luo",
      "A History of the Southern Luo",
      "Zamani: A Survey of East African History",
      "Kenya Before 1900",
      "The History of Kenya",
      "Warrior and Ruler: The Study of the Social and Political Organization of the Luo",
      "My Footprints on the Sands of Time: An Autobiography",
      "Trabalhos e capítulos na UNESCO General History of Africa",
    ],
  },
  {
    name: "Walter Rodney",
    works: [
      "How Europe Underdeveloped Africa",
      "A History of the Upper Guinea Coast, 1545–1800",
      "The Groundings with My Brothers",
      "The Russian Revolution: A View from the Third World",
      "World War II and the Tanzanian Economy",
      "A History of the Guyanese Working People, 1881–1905",
      "The Question of the Guianas",
      "Selected Writings",
      "Walter Rodney Speaks: The Making of an African Intellectual",
    ],
  },
  {
    name: "Amílcar Cabral",
    note: "Grande parte da produção está em discursos, conferências e documentos políticos.",
    works: [
      "Unity and Struggle: Speeches and Writings",
      "Return to the Source: Selected Speeches",
      "Revolution in Guinea",
      "National Liberation and Culture",
      "The Weapon of Theory",
      "The Practice of a Revolutionary",
      "Our People Are Our Mountains",
      "Presuppositions and Objectives of National Liberation",
      "Identity and Dignity in the National Liberation Struggle",
    ],
  },
  {
    name: "Aimé Césaire",
    works: [
      "Discourse on Colonialism",
      "Notebook of a Return to the Native Land",
      "The Tragedy of King Christophe",
      "A Season in the Congo",
      "Une Tempête",
      "Toussaint Louverture: La Révolution française et le problème colonial",
      "Poésie, théâtre, essais",
      "Lettre à Maurice Thorez",
    ],
  },
  {
    name: "W. E. B. Du Bois",
    note: "Fundamentalmente os trabalhos ligados ao panafricanismo e aos Congressos Pan-Africanos.",
    works: [
      "The Souls of Black Folk",
      "Black Reconstruction in America",
      "The World and Africa",
      "Color and Democracy",
      "Dusk of Dawn",
      "Black Folk, Then and Now",
      "The Negro",
      "The Philadelphia Negro",
      "Darkwater",
      "John Brown",
      "Africa: Its Geography, People and Products",
      "The Suppression of the African Slave Trade to the United States of America, 1638–1870",
      "The Negro in the South",
      "The Gift of Black Folk",
    ],
  },
  {
    name: "C. L. R. James",
    works: [
      "The Black Jacobins",
      "Beyond a Boundary",
      "A History of Negro Revolt",
      "World Revolution, 1917–1936",
      "Notes on Dialectics",
      "Nkrumah and the Ghana Revolution",
      "Modern Politics",
      "Facing Reality",
      "Mariners, Renegades and Castaways",
      "Black Power",
      "The Life of Captain Cipriani",
      "A History of Pan-African Revolt",
    ],
  },
  {
    name: "John Henrik Clarke",
    works: [
      "African People in World History",
      "Christopher Columbus and the Afrikan Holocaust",
      "Who Betrayed the African World Revolution?",
      "African World Revolution",
      "The Boy Who Painted Jesus Black",
      "The Lost Books of the Bible for Black People",
      "Malcolm X: Man and His Times",
      "Marcus Garvey and the Vision of Africa",
      "Harlem Renaissance and Pan-Africanism",
      "African World Revolution: Africa Since the 15th Century",
      "The Encyclopedia of African History — editor",
    ],
  },
  {
    name: "Théophile Obenga",
    note: "Especialmente importante para estudar Egito antigo, linguística africana, filosofia africana e continuidade histórica africana.",
    works: [
      "African Philosophy: The Pharaonic Period",
      "Ancient Egypt and Black Africa",
      "L’Afrique dans l’Antiquité",
      "La philosophie africaine de la période pharaonique",
      "Origine commune de l’égyptien ancien, du copte et des langues négro-africaines modernes",
      "Le sens de la lutte contre l’africanisme eurocentriste",
      "Pour une nouvelle histoire",
      "Histoire générale de l’Afrique — contribuições e trabalhos relacionados",
    ],
  },
  {
    name: "Ali A. Mazrui",
    works: [
      "The Africans: A Triple Heritage",
      "A World Federation of Cultures",
      "The Political Sociology of the English Language",
      "Cultural Forces in World Politics",
      "The Trial of Christopher Okigbo",
      "Towards a Pax Africana",
      "The Anglo-African Commonwealth",
      "Africa’s International Relations",
      "The Warrior Tradition in Modern Africa",
      "Political Values and the Educated Class in Africa",
      "Black Reparations in the Era of Globalization",
      "The Africans: A Triple Heritage — livro + série documental",
    ],
  },
  {
    name: "Basil Davidson",
    works: [
      "The African Slave Trade",
      "Old Africa Rediscovered",
      "Black Mother: The Years of the African Slave Trade",
      "Africa in History",
      "The Lost Cities of Africa",
      "A History of West Africa, 1000–1800",
      "Modern Africa: A Social and Political History",
      "The African Past: Chronicles from Antiquity to Modern Times",
      "Africa: History of a Continent",
      "In the Eye of the Storm",
      "The Black Man’s Burden: Africa and the Curse of the Nation-State",
      "Let Freedom Come: Africa in Modern History",
    ],
  },
  {
    name: "Boubacar Barry",
    works: [
      "Senegambia and the Atlantic Slave Trade",
      "Le royaume du Waalo: le Sénégal avant la conquête",
      "La Sénégambie du XVe au XIXe siècle: traite négrière, islam et conquête coloniale",
      "Sénégambie: du XVe au XIXe siècle",
      "L’histoire du Sénégal",
      "Reflections on the History of the Senegambia",
      "Trabalhos sobre Waalo, Senegâmbia, comércio atlântico, escravidão, islamização e conquista colonial",
    ],
  },
];

const Inspiracoes = () => {
  return (
    <div id="topo" className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-gradient-earth pb-16 pt-32 text-cream md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-saffron"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Início
          </Link>

          <motion.h1 {...fade(0.04)} className="mt-6 font-display text-4xl md:text-6xl">
            Inspirações
          </motion.h1>
          <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />
          <motion.p {...fade(0.12)} className="mt-6 max-w-3xl text-lg leading-relaxed text-cream/85 md:text-xl">
            Pessoas e obras que moldam o pensamento, a narrativa e o compromisso com uma história
            da África contada a partir de si mesma.
          </motion.p>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-4xl px-5">
          <div className="space-y-8">
            {inspiracoes.map((item, index) => (
              <motion.div
                key={item.name}
                {...fade(index * 0.04)}
                className="rounded-2xl border border-cream/20 bg-maroon p-6 md:p-8"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-saffron" />
                  <div>
                    <h2 className="font-display text-2xl text-cream md:text-3xl">{item.name}</h2>
                    {item.note && (
                      <p className="mt-2 text-sm italic leading-relaxed text-cream/90">{item.note}</p>
                    )}
                  </div>
                </div>
                <ul className="mt-5 space-y-2 border-t border-cream/20 pt-5">
                  {item.works.map((work) => (
                    <li key={work} className="flex items-start gap-2 text-sm leading-relaxed text-cream md:text-base">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-saffron" />
                      {work}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Inspiracoes;
