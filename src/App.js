import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //pegar todas as lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegar filme destaque(feature)
      let originals = list.filter(i => i.slug === 'originaisNetflix');
      let random = Math.floor(Math.random() * (originals[0].items.results.length) -1);
      let chosen = originals[0].items.results[random];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito por Augusto Zeni <br/>
        Direitos de Imagem Netflix <br/>
        Dados dos filmes/séries/documentários site <a href="https://www.themoviedb.org">Themoviedb.org/</a>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
            <img src="/load.gif" alt="carregando" />
        </div>
      }
    </div>
  );
}