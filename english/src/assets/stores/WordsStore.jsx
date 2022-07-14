import { makeAutoObservable, observable, action } from 'mobx';

export default class WordsStore {
    @observable dataWords = [];
    isloading = false;
    error = null;


    constructor() {
        makeAutoObservable(this);
    }
    @action fetchDataWords = async () => {
        if (this.isloading) {
            return
        }
        this.isloading = true //функция получения слов с сервера
        await fetch("http://itgirlschool.justmakeit.ru/api/words")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Something went wrong...")
                }
            }).then((result) => this.dataWords = [...result]).catch((er) => console.log(er)).finally(() => this.isloading = false)
        // runInAction(() => {
        //     this.dataWords = data;


    }



    editWords = async (word) => {
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/update`,
            {
                method: 'POST',
                body: JSON.stringify(word),
            }
        ).then(response => {
            if (response.ok) {
                this.fetchDataWords();
            } else {
                throw new Error("Something went wrong ...");
            }
        });
    };

    @action deleteWords = async (word) => {
        console.log('удаление');
        this.isloading = true;
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`,
            { method: 'POST' }
        )
            .then(() => {
                this.fetchDataWords()
            })
            .finally(this.isloading = false)
    };

    addWords = async (word) => {
        console.log('добавление');
        this.isloading = true
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/add`,
            {
                method: 'POST',
                body: JSON.stringify(word),
            }
        ).then(() => {
            this.fetchDataWords()
        }).catch((err) => console.log(err));

    };
}

