import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  // datayı people içine atıyoruz
  const [people, setPeople] = useState(data);
  // tek bir person göstereceğimiz için index tanımlıyoruz
  const [index, setIndex] = useState(0);
  

  // useEffect ile en son da ya da en baştayken döngüye girme durumunu ayarlıyoruz

  useEffect(() => {
    const lastIndex = people.length - 1;
    if(index < 0){
      setIndex(lastIndex);
    }
    if(index > lastIndex){
      setIndex(0);
    }
    // people a tanımlamamızın sebebi onun da değiştiği durumu kontrol altına alabilmek için
    // people yazmasak da çalışıyor...
  }, [index, people]);

  // 2.useEffect kullanılabiliyor
  // burda 3 saniye de bir sonraki person gösterilmek için bir setInterval kullandık
  
  useEffect(() => {
    // slider a atamamızın sebebi geçişlerde problem yaratmaması için 
    // clearInterval ile her geçişte temizliyoruz

   let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000)
    return () => clearInterval(slider);
    // yine useEffect index e göre yenileniyor
  }, [index]);

  return (
    // html 
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {
          // person içerisinde map ile geziyoruz 
          people.map((person, personIndex) => {
            // destructuring
            const{ id, image, name, title, quote } = person;
            // bir sonraki person a geçmek için css yardımıyla oluşturduğumuz classları kullanmak için
            // position tanımlıyoruz varsayılan değeri nextSlide
            // hepsi arka arkaya dizilsin diye
            let position = "nextSlide";
            // eğer person index bizim indeximize eşitse classı activeSlide oluyor ve 
            // o indexteki person görünüyor
            if(personIndex === index){
              position = "activeSlide";
            }
            // eğer personIndex bizim indeximizden küçükse yani bir eksiğine eşitse
            // ya da index 0 a eşitse ve personIndex i de son indexe eşitse
            // position lastSlide oluyor ki sonraki person da 0. indexe geçebilsin
            if(personIndex === index - 1 || ( index === 0 && personIndex === people.length - 1)){
              position = "lastSlide"
            }
            
            // oluşturduğumuz position yapısını css yardımıyla ana div class ına atıyoruz
            return <article key={id} className={position}>
              {/* html */}
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>

          })   
        }
        {/* prev ve next butonları indeksi -+1 değiştirmek için click eventi atadık */}
        <button className="prev" onClick={() => setIndex(index - 1)} ><FiChevronLeft/></button>
        <button className="next" onClick={() => setIndex(index + 1)}><FiChevronRight/></button>
      </div>
    </section>
  );
}

export default App;
