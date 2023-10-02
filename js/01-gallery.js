// Importujemy tablicę galerii z pliku "gallery-items.js", który zawiera informacje o zdjęciach w galerii.
import { galleryItems } from "./gallery-items.js";

// Pobieramy referencję do elementu o klasie "gallery", w którym będzie wyświetlana galeria.
const galleryEl = document.querySelector(".gallery");

// Tworzymy fragment dokumentu, który zostanie wykorzystany do efektywnego dodawania elementów do galerii.
const galleryFragment = document.createDocumentFragment();

// Iterujemy przez każdy element tablicy "galleryItems".
galleryItems.forEach((item) => {
  // Tworzymy nowy element <div> reprezentujący element galerii.
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("gallery__item"); // Dodajemy klasę "gallery__item" do elementu.

  // Tworzymy element <a> reprezentujący link do oryginalnego zdjęcia.
  const link = document.createElement("a");
  link.classList.add("gallery__link"); // Dodajemy klasę "gallery__link" do linku.
  link.href = item.original; // Ustawiamy atrybut "href" linku na oryginalny URL obrazu.

  // Tworzymy element <img> reprezentujący miniaturę obrazu w galerii.
  const image = document.createElement("img");
  image.classList.add("gallery__image"); // Dodajemy klasę "gallery__image" do obrazka.
  image.src = item.preview; // Ustawiamy atrybut "src" obrazka na URL miniatury.
  image.alt = item.description; // Dodajemy atrybut "alt" obrazka z opisem.
  image.dataset.source = item.original; // Ustawiamy atrybut "data-source" na oryginalny URL obrazu.

  // Dodajemy element obrazka do linku.
  link.appendChild(image);

  // Dodajemy link do elementu galerii.
  galleryItem.appendChild(link);

  // Dodajemy element galerii do fragmentu dokumentu.
  galleryFragment.appendChild(galleryItem);
});

// Dodajemy wszystkie elementy galerii z fragmentu dokumentu do elementu z klasą "gallery".
galleryEl.appendChild(galleryFragment);

// Inicjujemy zmienną "keyboardListener" jako null, która będzie używana do nasłuchiwania klawiatury.

// Nasłuchujemy kliknięcia na element o klasie "gallery".
document.querySelector(".gallery").onclick = (event) => {
  event.preventDefault(); // Zatrzymujemy domyślną akcję przeglądania.

  // Tworzymy instancję "basicLightbox" z oryginalnym obrazem, który zostanie wyświetlony w modalu.
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" alt="${event.target.alt}">
  `);

  // Wywołujemy modal.
  instance.show();

  // Sprawdzamy, czy zmienna "keyboardListener" jest null (czy nie nasłuchujemy jeszcze klawiszy).
  if (!keyboardListener) {
    // Tworzymy funkcję nasłuchującą klawiszy.
    keyboardListener = (event) => {
      // Jeśli naciśnięty klawisz to "Escape".
      if (event.key === "Escape") {
        // Zamykamy modal.
        instance.close();

        // Usuwamy nasłuchiwanie klawiatury.
        window.removeEventListener("keydown", keyboardListener);

        // Resetujemy zmienną "keyboardListener" na null.
        keyboardListener = null;
      }
    };

    // Dodajemy nasłuchiwanie klawiatury.
    window.addEventListener("keydown", keyboardListener);
  }
};
