const gradeData = {
            1: {
                title: "1. ročník",
                topics: [
                    "Základní ekonomické pojmy",
                    "Podnik, podnikání jako základ tržní ekonomiky",
                    "Okolí podniku",
                    "Podnikové činnosti"
                ]
            },
            2: {
                title: "2. ročník",
                topics: [
                    "Národní hospodářství a jeho okolí",
                    "Marketing",
                    "Oběžný majetek a logistika",
                    "Dlouhodobý majetek",
                    "Lidské zdroje v podniku"
                ]
            },
            3: {
                title: "3. ročník",
                topics: [
                    "Finanční trh a banky",
                    "Daně a zákonná pojištění",
                    "Finanční hospodaření podniku",
                    "Hlavní činnost podniku"
                ]
            },
            4: {
                title: "4. ročník",
                topics: [
                    "Prodejní činnost",
                    "Vnitřní obchod a prodej mimo ČR",
                    "Management"
                ]
            }
        };

        const topicsContainer = document.getElementById("topics-container");
        const gradeButtons = Array.from(document.querySelectorAll(".grade-button"));

        function renderTopics(gradeKey) {
            const data = gradeData[gradeKey];
            if (!data) {
                topicsContainer.innerHTML = '<p class="placeholder">Vyberte ročník, aby se zobrazila témata.</p>';
                return;
            }

            topicsContainer.innerHTML = `
                <section class="category-board" role="tabpanel" aria-label="${data.title}">
                    <h2>${data.title}</h2>
                    <div class="category-list">
                        ${data.topics
                            .map(topic => `<div class="category-item">${topic}</div>`)
                            .join("")}
                    </div>
                </section>
            `;
        }

        gradeButtons.forEach(button => {
            button.addEventListener("click", () => {
                gradeButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                renderTopics(button.dataset.grade);
            });
        });
