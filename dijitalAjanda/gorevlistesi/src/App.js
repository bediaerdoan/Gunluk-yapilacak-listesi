import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [yapilacaklar, setYapilacaklar] = React.useState([
    {
      gorev: "Ödevi tamamla",
      tamamlandiMi: false
    },
    {
      gorev: "Ders Çalış",
      tamamlandiMi: false
    },
    {
      gorev: "Tekrar ders çalışmaya başlayana kadar sosyalleş",
      tamamlandiMi: false
    }
  ]);

  const [yeniGorev, setYeniGorev] = useState("");

  const handleGorevEkle = () => {
    if (yeniGorev !== "") {
      setYapilacaklar([...yapilacaklar, {gorev: yeniGorev, tamamlandiMi: false}]);
      setYeniGorev("");
    }
  };

  const handleKeyPress = (event) => {
    if(event.key === "Enter") {
      handleGorevEkle();
    }
  };

  const handleInputChange = (event) => {
    setYeniGorev(event.target.value);
  };

  useEffect(() => {
    const kalanGorevSayisi = yapilacaklar.filter((gorev) => !gorev.tamamlandiMi).length;
    document.title = `Kalan Görev Sayısı: ${kalanGorevSayisi}`;
  }, [yapilacaklar]);

  return (
    <div className="app">
      <p style={{ fontSize: 50 }}> Kalan Görev Sayısı: {yapilacaklar.filter((gorev) => !gorev.tamamlandiMi).length} </p>{" "}
      <ul>
        {yapilacaklar.map((gorev, index) => (
          <li key={index}>
             <input type ="checkbox" checked={gorev.tamamlandiMi} onChange={() => {
                const yeniYapilacaklar = [...yapilacaklar];
                yeniYapilacaklar[index].tamamlandiMi = !gorev.tamamlandiMi;
                setYapilacaklar(yeniYapilacaklar);
              }} />
            <span style={{ textDecoration: gorev.tamamlandiMi ? "line-through" : "" }}>{gorev.gorev}</span>
            <button onClick={() => {
              const yeniYapilacaklar = [...yapilacaklar];
              yeniYapilacaklar.splice(index, 1);
              setYapilacaklar(yeniYapilacaklar);
            }}>Sil</button>
            <button onClick={() => {
              const yeniYapilacaklar = [...yapilacaklar];
              yeniYapilacaklar[index].tamamlandiMi = !gorev.tamamlandiMi;
              setYapilacaklar(yeniYapilacaklar);
            }}>
              {gorev.tamamlandiMi ? "Tamamlandı" : "Tamamla"}
            </button>
          </li>
        ))}
      </ul>
      
      <div>
        <input type="text" value={yeniGorev} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <button onClick={handleGorevEkle}>Görev Ekle</button>
      </div>

    </div>

  );
}
export default App;
