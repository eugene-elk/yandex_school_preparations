let data = window.data || {
    tags: {
        1: "важное",
        2: "личное",
        3: "рабочее",
        4: "Проект X",
        5: "Проект Y",
    },
    letters: [
        {
            id: "1",
            title: "Приглашение на день рождения",
            tags: ["1", "2"],
        },
        { 
            id: "2",
            title: "Ответ на ваш комментарий",
            tags: ["2"],
        },
        {
            id: "3",
            title: "Резюме последней встречи про X",
            tags: ["3", "4"],
        },
        { 
            id: "4",
            title: "Расчётный лист",
            tags: ["1", "3"],
        },
        {
            id: "5",
            title: "Нужна помощь с Y",
            tags: ["3", "5"],
        },
        {
            id: "6",
            title: "Регулярная рассылка для клиентов",
            tags: [],
        },
    ],
};
  
function mapAndJoin(a, f, s = "") {
    return a.map(f).join(s);
}
  
function buildHtml(data) {
    return `
        <div class="Main">
            <div class="Tags">
                ${mapAndJoin(Object.entries(data.tags), ([id, title]) =>
                    buildTagHtml(id, title)
                )}
            </div>
            <div class="Letters">
                ${mapAndJoin(
                    data.letters,
                    ({ id, title, tags }) => `
                        <div class="Letter" data-letter-id="${id}">
                            <div class="Letter__Title">${title}</div>
                            ${mapAndJoin(tags, (l) => buildTagHtml(l, data.tags[l]))}
                        </div>
                    `
                )}
            </div>
        </div>
    `;
}

function buildTagHtml(id, title) {
    return `<div class="Tag" data-tag-id="${id}" draggable="true">${title}</div>`;
}
  
document.body.innerHTML = buildHtml(data);
window.onSolutionReady && window.onSolutionReady();