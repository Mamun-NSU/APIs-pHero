const elementById = (id) => {
  return document.getElementById(id);
};
const artistContainer = elementById("artists");
const albumContainer = elementById("albums");
const handleSearch = () => {
  artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
  const keyword = elementById("keyword");
  // console.log(keyword);
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  artistContainer.innerHTML = "";
  // console.log(artistContainer);
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${
          artist.strArtistThumb
            ? artist.strArtistThumb
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFpuWD5ahdQQzZDNi5PNqPcp1P_oCr6r4p0A&usqp=CAU"
        }"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${
      artist.idArtist
    }')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  // console.log(data);

  albumContainer.innerHTML = "";
  data.album.forEach((item) => {
    /*     console.log(data.album);
    console.log(item); */
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${
              item.strAlbumThumb
                ? item.strAlbumThumb
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQI56utJ6fav7bXDqhE-AK5RbAv4xhp8dNQ&usqp=CAUhttps://image.shutterstock.com/image-illustration/retro-futuristic-background-1980s-style-260nw-1119762995.jpg"
            }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
