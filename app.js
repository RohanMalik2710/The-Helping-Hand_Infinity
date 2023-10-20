function createQuestions(questionTitles) {
    const options = [
        { label: 'None' },
        { label: 'Mild' },
        { label: 'Moderate' },
        { label: 'Severe' },
        { label: 'Extreme' }
    ];

    return questionTitles.map(function(title) {
        return {
            title: title,
            type: 'MultipleChoice',
            options: options
        };
    });
}

var app = Vue.createApp({
    el: '#app',
    template: '<flow-form v-bind:questions="questions" v-bind:language="language" @option-selected="selectOption"/>',
    data: function() {
        return {
            language: {},
            questions: createQuestions(['Concentrating on doing something for ten minutes?', 'Remembering to do important things?', 'Analyzing and finding solutions to problems in day-to-day life?', 'Learning a new task, for example, learning how to get to a new place?', 'Generally understanding what people say?','Starting and maintaining a conversation?','Standing for long periods, such as 30 minutes?','Standing up from sitting down?','Moving around inside your home?','Getting out of your home?','Walking a long distance, such as a kilometer (or equivalent)?','Getting dressed?','Eating?','Staying by yourself for a few days?'])
        }
    },
    methods: {
        selectOption(option, questionTitle) {
            // Storing the selected option in local storage
            localStorage.setItem(questionTitle, optionslabel);
        }
    }
}).component('FlowForm', {
    props: ['questions', 'language'],
    template: `
        <div>
            <div v-for="(question, index) in questions" :key="index">
                <h3>{{ question.title }}</h3>
                <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                    <input type="radio" :id="option.label" :value="option.label" v-model="question.selectedOption" @change="optionSelected(option, question)"/>
                    <label :for="option.label">{{ option.label }}</label>
                </div>
            </div>
        </div>
    `,
    methods: {
        optionSelected(option, question) {
            this.$emit('option-selected', option, question.title);
        }
    }
});

const vm = app.mount('#app');

function local(){
    document.write('<h2>Report :</h2>');
    for (i = 0; i < localStorage.length; i++)   {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    document.write(`<li> <b>${key}</b>" ${value}</li>`);
}  
}
