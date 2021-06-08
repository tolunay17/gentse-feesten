const gentse_feesten_artists = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const events_url = 'https://www.pgm.gent/data/gentsefeesten/categories.json';
(() => {
  const app = {
    initialize() {
      console.log('1 App started');
      this.cacheElements();
      this.buildUI();
      // this.hamburgerMenu();
      // this.gentse_feesten_artists();
      this.eventListener();
      // this.readUrlParam();
      this.fetchCategorie();
      this.toggleGridList();
    },
    cacheElements() {
      console.log('2. Caching the elemnts');
      this.$data = document.querySelector('.artist-all');
      this.$program = document.querySelector('.program-all');
      this.$button = document.querySelector('.hamburger');
      this.$button2 = document.querySelector('.mobile-close');
      this.$event = document.querySelector('.artist-all-two')
      this.$container = document.querySelector('.container__ul');
      this.$container = document.querySelector('.container__two-ul');
      this.$gridContent = document.querySelector('.gridContent');
      this.$detailInfo = document.querySelector('.detail-info');
    },
    buildUI() {
      console.log('3. Build the user interface');
      // this.$data.innerHTML = this.gentse_feesten_artists();
      if (this.$data) {
        this.$data.innerHTML = this.gentse_feesten_artists();
      }
      if (this.$event) {
        this.$event.innerHTML = this.gentse_feesten_artistsData();
      }
      if (this.$program) {
        this.$event.innerHTML = this.gentse_feesten_program();
      }
      if (this.$detailInfo) {
        this.$detailInfo.innerHTML = this.gentse_feesten_detail_info();
      }
    },
    toggleGridList () {
      const listBtn = document.getElementById('listBtn');
      const gridBtn = document.getElementById('gridBtn');
      if(listBtn && gridBtn) {
        listBtn.addEventListener('click', () => {
          if (!this.$gridContent.classList.contains('list')) {
            this.$gridContent.classList.add('list');
          }
        });
        gridBtn.addEventListener('click', () => {
          if (this.$gridContent.classList.contains('list')) {
            this.$gridContent.classList.remove('list');
          }
        });
      }
    },
    hamburgerMenu() {
      let box = document.querySelector(".mobile-nav")
      console.log(box)
      if (box.classList.contains('open')) {
        box.classList.remove('open');
      } else {
        box.classList.add('open');
      }
    },
    
    eventListener(){
      this.$button.addEventListener('click', () => this.hamburgerMenu());
      this.$button2.addEventListener('click', () => this.hamburgerMenu());
    },
    gentse_feesten_detail_info() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.detailInfo(json));
    },
    detailInfo(data) {
      let tempStr = '';
      // locatie
      const search = window.location.search;
      // urlparameters
      const params = new URLSearchParams(search);
      // get urlparameters
      const day = params.get('day');
      const slug = params.get('slug');

      const item = data.filter(d => d.slug === slug && d.day === day)[0];
      tempStr = `
            <h2>${item.title}</h2>
            <h3>${item.location}</h3>
            <span>${item.day_of_week} ${item.day} Jul - ${item.start} > ${item.end}</span>
            <div class="all-info"> 
            <img src="${item.image !== null ? item.image.thumb : "_static/media/default.jpg"}">
            <div class="detail-info-spec"><p>${item.description !== undefined ? item.description: "De Tekst wordt niet meegegeven!"}</p>
            <p>website: <a href="${item.url}">http://www.miramiro.be</a></p>
            <p>Organisator: <a href="${item.organisator}">${item.organisator !== undefined ? item.organisator:"Organisator niet gevonden"}</a></p>
            <p>Category: <a href="${item.category}">${item.category !== undefined ? item.category:"Categorieën niet gevonden"}</a></p>
            <p>Leeftijd: <span>Leeftijden kunnen veranderen naarmate de consert</span></p>
            <div class="detail-info-prijs"><p>Prijs: <span>lonely bird. (er zijn ook nestjes te koop die voordeliger zijn. meer info op onze site)</span></p></div>
          </div>
        </div>
      `
      return this.$detailInfo.innerHTML = tempStr;
    },
    gentse_feesten_artists() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.gentseFeesten(json));
    },
    gentseFeesten(data) {
      let tempStr = '';
      data.slice(0, 3).forEach(evt => {
        tempStr += `
        <article class="artist">
        <img src=${evt.image.thumb}>
        <div class="artist-time">
        <h3>${evt.day} Jul ${evt.start} u.</h3>
        </div>
        <div class="artist-info">
        <h3>${evt.title}</h3>
        <h4>${evt.location}</h4>
        </div>
        </article>
        `
      });
      return this.$data.innerHTML = tempStr;
    },
    gentse_feesten_artistsData() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.readUrlParam(json));
    },
    gentse_feesten_program() {
      fetch(gentse_feesten_artists, {})
      .then(response => response.json())
      .then(json => this.readUrlParamProgram(json));
    },
    readUrlParamProgram(event) {
      // locatie
      const search = window.location.search;
      // urlparameters
      const params = new URLSearchParams(search);
      // get urlparameters
      const type = params.get('day');
      if(type !== null) {
        let tempStr = '';
        event.map(short => {
            if (short.day === type) {
              tempStr += `
                <article class="artist-sec">
                <ul><li>
                <a href="dag.html?slug=${short.slug}">
                <img src="${short.image !== null ? short.image.thumb : "_static/media/default.jpg"}">
                <div class="artist-sec-time">
                <h3>${short.start} u.</h3>
                </div>
                <div class="artist-sec-info">
                <h3>${short.title}</h3>
                <h4>${short.location}</h4>
                </div>
                </a>
                </li></ul>
                </article>
              `
            return this.$program.innerHTML = tempStr;
          } 
        }) 
      } else {
        let tempStr = '';
        event.map(short => {
          tempStr += `
            <article class="artist-sec">
            <ul><li>
            <a href="${short.slug}">
            <img src="${short.image !== null ? short.image.thumb : "_static/media/default.jpg"}">
            <div class="artist-sec-time">
            <h3>${short.start} u.</h3>
            </div>
            <div class="artist-sec-info">
            <h3>${short.title}</h3>
            <h4>${short.location}</h4>
            </div>
            </a>
            </li></ul>
            </article>
          `
          return this.$program.innerHTML = tempStr;
        }) 
      }
    },
    readUrlParam(event) {
      // locatie
      const search = window.location.search;
      // urlparameters
      const params = new URLSearchParams(search);
      // get urlparameters
      const type = params.get('day');

      if(type !== null) {
        let tempStr = '';
        event.map(short => {
            if (short.day === type) {
              tempStr += `
                <article class="artist-sec">
                <ul><li>
                <a href="${short.slug}">
                <img src="${short.image !== null ? short.image.thumb : "_static/media/default.jpg"}">
                <div class="artist-sec-time">
                <h3>${short.start} u.</h3>
                </div>
                <div class="artist-sec-info">
                <h3>${short.title}</h3>
                <h4>${short.location}</h4>
                </div>
                </a>
                </li></ul>
                </article>
              `
            return this.$event.innerHTML = tempStr;
          } 
        }) 
      }
    },
    fetchCategorie() {
      fetch(events_url)
      .then((response) => response.json())
      .then((json) => {
        this.categories = json;
        this.fetchEvents();
      })
      .catch((e) => console.log(e));
    },
    fetchEvents() {
      fetch(gentse_feesten_artists) 
        .then((response) => response.json())
        .then ((json) => {
          this.events = json;
          this.populateHtml();
          this.gridContentHtml();
        })
        .catch((e) => console.log(e))
    },
    populateHtml() {      
      console.log(this.categories);
      console.log(this.events);
      
      let tempStr = '';
      this.categories.map((event) => {
        return this.$container.innerHTML += tempStr;
      })
      let html = this.categories.map((category) => {
        return`
        <li><a href="dag.html#${category}">${category}</a></li>
        `
      }).join('');
      return this.$container.innerHTML = html;
    },

    gridContentHtml() {
      let html = this.categories.map((category) => {
        const filteredEvents = this.events.filter((event)=> {
          return event.category.indexOf(category) > -1; 
        });
        const listItems = filteredEvents.map((event) => {
          return `
          <li>
            <a href="detail.html?day=${event.day}&slug=${event.slug}">
              <article class="artist">
                <img src="${event.image !== null ? event.image.thumb : "_static/media/default.jpg"}">
                <div class="artist-time">
                  <h3>${event.start} u.</h3>
                </div>
                <div class="artist-info">
                  <h3>${event.title}</h3>
                  <h4>${event.location}</h4>
                </div>
              </article>
            </a>
          </li>
          `;          
        }).join('');
        return `
        <article class="artist">
          <h2 id="${category}">${category}</h2>
         <ul>
        ${listItems}
         </ul>
        </article>`
      }).join('');
      this.$gridContent.innerHTML = html;
    },
  }
  app.initialize();
})();
