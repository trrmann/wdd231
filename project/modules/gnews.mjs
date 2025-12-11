import { GetNow } from "./date.mjs";
import { SetPreferenceObject, GetPreferenceObject, HasPreference } from "./preference.mjs";

export class News {
  constructor(query=this.GetQuery(), max=this.GetMaxArticles(), lang=this.GetLanguage(), country=this.GetCountry(), sortby=this.GetSortBy(), currentMaxAgeMS=this.GetCurrentMaxAgeMS(), APIKey=this.GetAPIKey()) {
    this.query = query;
    this.max = max;
    this.lang = lang;
    this.country = country;
    this.sortby = sortby;
    this.currentMaxAgeMS = currentMaxAgeMS;
    this.APIKey = APIKey;
    this.lastCurrentFetch = null;
    this.currentChanged = true;
  }
  static CopyFromJSON(newsJSON) {
    const news = new News(newsJSON.query, newsJSON.max, newsJSON.lang, newsJSON.country, newsJSON.sortby, newsJSON.currentMaxAgeMS, newsJSON.APIKey);
    news.lastCurrentFetch = newsJSON.lastCurrentFetch;
    news.currentChanged = newsJSON.currentChanged;
    news.currentData = newsJSON.currentData;
    return news;
  }
  static CopyFromObject(newObject, oldObject) {
    newObject.query = oldObject.query;
    newObject.max = oldObject.max;
    newObject.lang = oldObject.lang;
    newObject.country = oldObject.country;
    newObject.sortby = oldObject.sortby;
    newObject.currentMaxAgeMS = oldObject.currentMaxAgeMS;
    newObject.APIKey = oldObject.APIKey;
    newObject.lastCurrentFetch = oldObject.lastCurrentFetch;
    newObject.currentChanged = oldObject.currentChanged;
    newObject.currentData = oldObject.currentData;
    return newObject;
  }
  GetLocalStorageKey(){
    return (this.GetCountry()+'.'+this.GetLanguage()+'.'+this.GetQuery()).replaceAll(" ","").replaceAll("\"","").trim();
  }
  GetQuery() {
    if(this.query == null) {
      return 'Peru AND NOT "La Salle-Peru" AND NOT "La Salle-Peru\'s" AND NOT "LaSalle-Peru" AND NOT "LaSalle-Peru\'s"';
    } else {
      return this.query;
    }
  }
  GetMaxArticles() {
    if(this.max == null) {
      return '10';
    } else {
      return this.max;
    }
  }
  GetLanguage() {
    if(this.lang == null) {
      return 'en';
    } else {
      return this.lang;
    }
  }
  GetCountry() {
    if(this.country == null) {
      return 'us';
    } else {
      return this.country;
    }
  }
  GetSortBy() {
    if(this.sortby == null) {
      return 'publishedAt';
    } else {
      return this.sortby;
    }
  }
  GetCurrentMaxAgeMS() {
    if(this.currentMaxAgeMS == null) {
      return 1000*60*60*12;
    } else {
      return this.currentMaxAgeMS;
    }
  }
  GetAPIKey() {
    if(this.APIKey == null) {
      return 'f9682f1c1b5c1ab3703efdb2270c0a34';
    } else {
      return this.APIKey;
    }
  }
  GetNewsAPIURL(query=this.GetQuery(),country=this.GetCountry(),lang=this.GetLanguage(),max=this.GetMaxArticles(),apikey=this.GetAPIKey())
  {
    "fetch(\"https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/top-headlines?token=YOUR_API_KEY\")"
    return `https://gnews.io/api/v4/search?q=${query}&country=${country}&lang=${lang}&max=${max}&apikey=${apikey}`;
  }
  IsQueryDefined() {
    return !(this.GetQuery() == null);
  }
  IsMaxArticlesDefined() {
    return !(this.GetMaxArticles() == null);
  }
  IsLanguageDefined() {
    return !(this.GetLanguage() == null);
  }
  IsCountryDefined() {
    return !(this.GetCountry() == null);
  }
  IsSortByDefined() {
    return !(this.GetSortBy() == null);
  }
  IsCurrentMaxAgeMSDefined() {
    return !(this.GetCurrentMaxAgeMS() == null);
  }
  IsAPIKeyDefined() {
    return !(this.GetAPIKey() == null);
  }
  IsDefined() {
    return this.IsQueryDefined() & this.IsMaxArticlesDefined() & this.IsLanguageDefined() & this.IsCountryDefined() & this.IsSortByDefined() & this.IsCurrentMaxAgeMSDefined() & this.IsAPIKeyDefined();
  }
  async FetchNews() {
    if(this.IsDefined()) {
      if(HasPreference(this.GetLocalStorageKey())) {
        News.CopyFromObject(this,GetPreferenceObject(this.GetLocalStorageKey()));
      }
      if(this.GetCurrentFetchExpired()) {
        try {
          const currentURL = this.GetNewsAPIURL(this.query, this.country, this.lang, this.max, this.GetAPIKey());
          /*const header = {
            method: 'GET', // Method is optional for GET, as it is the default
            headers: {
              'origin',
              'x-requested-with'
            }}*/
          const currentResponse = await fetch(currentURL/*, header*/);
          if(currentResponse.ok) {
            this.currentData = await currentResponse.json();
            //console.log(this.data); // testing only
            this.currentChanged = false;
            this.lastCurrentFetch = GetNow();
          } else {
            throw Error(await currentResponse.text());
          }
        } catch(error) {
          if(error.message === '{\"errors\":[\"This request was blocked because you made too many requests on the API in a short period of time.\"]}') {
            console.log(error);
          } else if(error.message === "Failed to fetch") {
            console.log(error);
            this.currentData = {
              articles: [],
              message: "Service not available, please try again later."}
          } else {
            console.error(error);
            throw error;
          }
        }
      }
      SetPreferenceObject(this.GetLocalStorageKey(), this);
      return await this.currentData.totalArticles;
    } else {
      console.error('Fetch current attempted without defining required parameters!');
      throw Error('Fetch current attempted without defining required parameters!');
    }
  }
  GetCurrentFetchMSAge() {
    if(!(this.lastCurrentFetch == null)) {
      return Date.now() - this.lastCurrentFetch;
    } else {
      return null;
    }
  }
  GetCurrentFetchExpired() {
    if(this.GetCurrentFetchMSAge() == null) {
      return true;
    } else {
      return this.GetCurrentFetchMSAge() > this.currentMaxAgeMS;
    }
  }
  async GetTotalArticleCount() {
    await this.FetchNews();
    return await this.currentData.totalArticles;
  }
  async GetArticleCount() {
    await this.FetchNews();
    return await this.currentData.articles.length;
  }
  async GetArticle(index) {
    if(index< await this.GetArticleCount()) {
      return await this.currentData.articles[index];
    } else {
      return null;
    }
  }
  async GetArticleID(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.id;
    } else {
      return null;
    }
  }
  async GetArticleTitle(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.title;
    } else {
      return null;
    }
  }
  async GetArticleDescription(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.description;
    } else {
      return null;
    }
  }
  async GetArticleContent(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.content;
    } else {
      return null;
    }
  }
  async GetArticleURL(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.url;
    } else {
      return null;
    }
  }
  async GetArticleImage(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.image;
    } else {
      return null;
    }
  }
  async GetArticlePublishedAt(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.publishedAt;
    } else {
      return null;
    }
  }
  async GetArticleLang(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.lang;
    } else {
      return null;
    }
  }
  async GetArticleSource(index) {
    const article = await this.GetArticle(index);
    if(article != null) {
      return await article.source;
    } else {
      return null;
    }
  }
  async GetArticleSourceId(index) {
    const article = await this.GetArticleSource(index);
    if(article != null) {
      return await article.id;
    } else {
      return null;
    }
  }
  async GetArticleSourceName(index) {
    const article = await this.GetArticleSource(index);
    if(article != null) {
      return await article.name;
    } else {
      return null;
    }
  }
  async GetArticleSourceURL(index) {
    const article = await this.GetArticleSource(index);
    if(article != null) {
      return await article.url;
    } else {
      return null;
    }
  }
  async GetArticleSourceCountry(index) {
    const article = await this.GetArticleSource(index);
    if(article != null) {
      return await article.country;
    } else {
      return null;
    }
  }
  async DisplayNewsSpotlightResults(newsContainer, articleDisplayTimeMS, newsCycles) {
    this.newsContainer = newsContainer;
    this.newsCycles = newsCycles;
    this.articleDisplayTimeMS = articleDisplayTimeMS;
    this.newsRotationIndex = 0;
    this.newsRotationCycles = 0;
    await this.DisplayNewsSpotlightContainerResults();
    //this.newsRotation = setInterval(async() => await this.processInterval(), this.articleDisplayTimeMS);
  }
  async processInterval() {
    this.newsRotationIndex++;
    //console.log(`${this.newsRotationIndex} - ${await this.GetArticleCount()}`);
    if(this.newsRotationIndex>=(await this.GetArticleCount())) {
      this.newsRotationIndex=0;
      this.newsRotationCycles++;
    }
    //console.log(`${this.newsRotationIndex} - ${await this.GetArticleCount()}`);
    await this.DisplayNewsSpotlightContainerResults();
    if(this.newsCycles>=0 && this.newsRotationCycles>this.newsCycles) {
      clearInterval(this.newsRotation);
    }
  } 
  async DisplayNewsSpotlightContainerResults() {
    this.newsContainer.classList.add('news-spotlight-container');
    this.newsContainer.innerHTML='';
    const articleTitle = await this.GetArticleTitle(this.newsRotationIndex);
    const articleFound = (articleTitle != null);
    const title = document.createElement('h3');
    if(articleFound) {
      title.classList.add('news-spotlight-title');
      title.textContent = articleTitle;
      const articleDescription = await this.GetArticleDescription(this.newsRotationIndex);
      const description = document.createElement('p');
      description.classList.add('news-spotlight-description');
      description.textContent = articleDescription;
      const articleImage = await this.GetArticleImage(this.newsRotationIndex);
      const image = document.createElement('img');
      image.classList.add('news-spotlight-image');
      image.src = articleImage;
      image.alt = articleTitle;
      const newsDialog = document.createElement('dialog');
      newsDialog.classList.add('news-dialog');
      const newsDialogContent = document.createElement('div');
      newsDialogContent.classList.add('news-dialog-content');
      const dialogTitle = document.createElement('h2');
      dialogTitle.classList.add('news-dialog-title');
      dialogTitle.textContent = articleTitle;
      const newsDialogCloseButton = document.createElement('button');
      newsDialogCloseButton.classList.add('news-dialog-close');
      newsDialogCloseButton.textContent = '❌';
      newsDialogCloseButton.addEventListener('click',async () => {
        newsDialog.close();
        this.newsRotationIndex--;
        this.newsContainer
        this.newsRotation = setInterval(async() => await this.processInterval(), this.articleDisplayTimeMS);
      });
      const dialogImage = document.createElement('img');
      dialogImage.classList.add('news-dialog-image');
      dialogImage.src = articleImage;
      dialogImage.alt = articleTitle;
      const articleURL = await this.GetArticleURL(this.newsRotationIndex);
      const url = document.createElement('a');
      url.classList.add('news-dialog-url');
      url.href = articleURL;
      url.appendChild(dialogImage);
      const articleContent = await this.GetArticleContent(this.newsRotationIndex);
      const content = document.createElement('p');
      content.classList.add('news-dialog-content');
      content.textContent = articleContent;
      const articlePublishedAt = await this.GetArticlePublishedAt(this.newsRotationIndex);
      const publishedAt = document.createElement('p');
      publishedAt.classList.add('news-dialog-publishedAt');
      publishedAt.textContent = articlePublishedAt;
      const articleSourceName = await this.GetArticleSourceName(this.newsRotationIndex);
      const sourceName = document.createElement('p');
      sourceName.classList.add('news-dialog-source-name');
      sourceName.textContent = articleSourceName;
      const articleSourceURL = await this.GetArticleSourceURL(this.newsRotationIndex);
      const sourceURL = document.createElement('a');
      sourceURL.classList.add('news-dialog-source-url');
      sourceURL.href = articleSourceURL;
      sourceURL.appendChild(sourceName);
      const articleId = await this.GetArticleID(this.newsRotationIndex);
      const id = document.createElement('p');
      id.classList.add('news-dialog-article-id');
      id.textContent = articleId;
      const articleLang = await this.GetArticleLang(this.newsRotationIndex);
      const lang = document.createElement('p');
      lang.classList.add('news-dialog-article-lang');
      lang.textContent = articleLang;
      const articleSourceId = await this.GetArticleSourceId(this.newsRotationIndex);
      const sourceId = document.createElement('p');
      sourceId.classList.add('news-dialog-source-id');
      sourceId.textContent = articleSourceId;
      const articleSourceCountry = await this.GetArticleSourceCountry(this.newsRotationIndex);
      const sourceCountry = document.createElement('p');
      sourceCountry.classList.add('news-dialog-source-country');
      sourceCountry.textContent = articleSourceCountry;
      newsDialogContent.appendChild(dialogTitle);
      newsDialogContent.appendChild(newsDialogCloseButton);
      newsDialogContent.appendChild(url);
      newsDialogContent.appendChild(content);
      newsDialogContent.appendChild(publishedAt);
      newsDialogContent.appendChild(sourceURL);
      newsDialogContent.appendChild(id);
      newsDialogContent.appendChild(lang);
      newsDialogContent.appendChild(sourceId);
      newsDialogContent.appendChild(sourceCountry);
      newsDialog.appendChild(newsDialogContent);
      this.newsContainer.appendChild(newsDialog);
      newsDialog.close();
      const readMore = document.createElement('button');
      readMore.classList.add('news-spotlight-button');
      readMore.textContent = 'Read More';
      readMore.addEventListener('click', ()=>{
        clearInterval(this.newsRotation);
        newsDialog.showModal();
      });
      this.newsContainer.appendChild(title);
      this.newsContainer.appendChild(description);
      this.newsContainer.appendChild(image);
      this.newsContainer.appendChild(readMore);
    } else {
      title.classList.add('news-spotlight-not-available');
      title.textContent = "News Service is not currently available, please try again later.";
      this.newsContainer.appendChild(title);
    }
  }
  async DisplayNewsResults(newsContainerClass, news) {
    const newsContainer = document.querySelector(newsContainerClass);
  }
}