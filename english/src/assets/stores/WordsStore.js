import { makeAutoObservable, runInAction } from 'mobx';


export default class WordsStore {
    dataWords = [];
    isloading = false;
    error = null;


    constructor() {
        makeAutoObservable(this);
    }


     fetchDataWords = async () => {
        if (this.isloading) {
            return
        }
        this.isloading = true //функция получения слов с сервера
        const data = await fetch("http://itgirlschool.justmakeit.ru/api/words")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Something went wrong...")
                }
            })
        runInAction(() => {
        this.dataWords = data;
        this.isloading = false;
        });
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

    deleteWords = async (word) => {
        console.log('удаление');
        this.isloading = true;
        await fetch(
            `http://itgirlschool.justmakeit.ru/api/words/${word.id}/delete`,
            { method: 'POST' }
        )
            .then(() => {
                this.fetchDataWords()
            })
            .catch((err) => this.error=err)
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
        }).catch((err) => this.error=err).finally(this.isloading = false)

    };

    clearError() {
        this.error = null;
      }


}

