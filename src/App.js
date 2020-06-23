import React, { useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';
import styled from 'styled-components';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import '@fortawesome/fontawesome-free/js/all';
import Logo from './Logo';
import BackgroundLanding from './assets/background-landing.svg';
import BackgroundRegular from './assets/background-regular.svg';
import Matrix from './assets/matrix.png';
import Recipe from './assets/recipe.png';
import Christophe from './assets/christophe.jpg';
import Thibaut from './assets/thibaut.jpg';
import Arrow from './assets/arrow.svg';
import Spectators from './assets/spectators.png';
import Directors from './assets/directors.png';

const primaryColor = (opacity=1) => `rgba(27, 28, 48, ${opacity})`;

const StyledContainer = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Convergence&family=Quicksand:wght@300&display=swap');
  h2 {
    font-family: 'Convergence', sans-serif;
    font-variant-caps: small-caps;
    text-transform: inherit;
  }
  * {
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
  }
  *:not(a, svg) {
    color: ${primaryColor()} !important;
  }
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &[data-background="landing"] {
    background-image: url(${BackgroundLanding});
    background-position: left 35vw top 0;
  }
  &[data-background="regular"] {
    background-image: url(${BackgroundRegular});
  }
  .github-corner {
    z-index: 1;
  }
  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
  a.icon-link {
    color: inherit;
    svg {
      font-size: 16px;
    }
  }
  .super {
    vertical-align: super;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
  @keyframes octocat-wave {
    0%, 100% {
      transform: rotate(0);
    }
    20%, 60% {
      transform: rotate(-25deg);
    }
    40%, 80% {
      transform: rotate(10deg);
    }
  }
  @media (max-width:500px) {
    .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
`;

const StyledAvatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 200px;
    filter: drop-shadow(0 0 5px ${primaryColor(0.5)});
    border-radius: 100%;
  }
  .name {
    font-size: 0.7em;
  }
  .title {
    font-size: 0.5em;
    font-style: italic;
  }
  .links {
    display: flex;
    svg {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
;`

const Prompt = ({ children, align='center' }) => (
  <h3 style={{ textAlign: align, textTransform: 'inherit' }}>
    <ul style={{ listStyleType: '"— "' }}>
      <li>{children}</li>
    </ul>
  </h3>
);

const Section = ({ background='regular', showBonus=false, children }) => {
  return (
    <section data-background={background} data-show-bonus={showBonus}>
      {children}
    </section>
  );
};

const List = styled.ul`
  li {
    list-style-type: ${({ listStyleType="\"🎬 \"" }) => listStyleType};
    font-size: 0.8em;
    margin-top: 1.2em;
    li {
      list-style-type: inherit;
      margin-top: 0;
    }
  }
`;

const App = () => {
  const revealRef = useRef(null);
  const [showBonus, setShowBonus] = useState(false);
  useEffect(() => {
    Reveal.initialize({
      controlsBackArrows: 'visible',
      hashOneBasedIndex: true,
      hash: true,
      history: true,
      mouseWheel: true,
    });
    Reveal.on('slidechanged', ({ currentSlide }) => {
      revealRef.current.setAttribute('data-background', currentSlide.getAttribute('data-background'));
      setShowBonus(currentSlide.getAttribute('data-show-bonus') === 'true');
    });
  }, []);
  return (
    <StyledContainer
      className="reveal"
      style={{ height: '100vh' }}
      ref={revealRef}
      data-background="landing" // initial value, will be changed on 'slidechanged' event
    >
      {showBonus ? (
        <>
          <a href="https://github.com/claptime/deck/" className="github-corner" target="_blank" rel="noopener noreferrer" title="Voir le code source">
            <svg
              width="80"
              height="80"
              viewBox="0 0 250 250"
              style={{
                fill: '#151513',
                color: '#fff',
                position: 'absolute',
                top: 40,
                border: 0,
                left: 0,
                transform: 'scale(-1, 1)',
              }}
              aria-hidden="true"
            >
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
              <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm" />
              <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body" />
            </svg>
          </a>
          <div style={{ position: 'absolute', left: 100, bottom: 75, display: 'flex', animation: 'blinker 3s linear infinite' }}>
            <img src={Arrow} alt="" />
            <p style={{ fontSize: '0.7em', fontVariant: 'small-caps', color: '#fb2037' }}>Découvrir Claptime</p>
          </div>
        </>
      ) : null}
      <div style={{ width: 200, position: 'absolute', bottom: 25, left: 25, zIndex: 1 }}>
        <a href="https://www.clap-time.com" target="_blank" rel="noopener noreferrer" title="Découvrir Claptime">
          <Logo color={primaryColor()} />
        </a>
      </div>
      <div className="slides">
        <Section background="landing">
          <Prompt align="left">Silence !</Prompt>
          <Prompt align="left">Moteur ?</Prompt>
          <Prompt>Ça pitch !</Prompt>
          <Prompt align="left">Action !</Prompt>
        </Section>
        <Section>
          <h2>Le constat</h2>
          <List listStyleType="none">
            <li style={{ listStyleType: "\"✔️ \"" }}>Il est de plus en plus facile de produire un film</li>
            <li style={{ listStyleType: "\"✔️ \"" }}>
              Il existe un réel engouement autour des formats alternatifs
              <ul>
                <li>+ de 100 festivals de courts métrages en France</li>
                <li>+ de 2000 films soumis en compétition nationale au seul festival de Clermont-Ferrand</li>
              </ul>
            </li>
            <li style={{ listStyleType: "\"✖️ \"" }}>Les circuits de distribution classiques (TV, cinéma, plateformes VOD grand public) restent en revanche toujours aussi verrouillés</li>
          </List>
        </Section>
        <Section>
          <p style={{ fontSize: '1.5em' }}>Claptime est la plateforme vidéo dédiée au cinéma et aux réalisateurs indépendants, qui favorise et soutient la création.</p>
        </Section>
        <Section>
          <h2>Notre mission</h2>
          <p style={{ fontSize: '1.5em' }}>
            Combattre l'uniformisation culturelle et valoriser la diversité cinématographique
          </p>
        </Section>
        <Section>
          <h2>Le meilleur de 3 mondes</h2>
          <img src={Recipe} alt="La recette de Claptime" className="r-stretch" />
        </Section>
        <Section>
          <h2>L'écosystème VOD</h2>
          <img src={Matrix} alt="Écosystème des service francophones de vidéo à la demande" className="r-stretch" />
        </Section>
        <Section>
          <h2>Proposition de valeur</h2>
          <p style={{ textAlign: 'left', marginBottom: 0 }}>Pour les spectateurs :</p>
          <img src={Spectators} alt="Proposition de valeur de Claptime pour les spectateurs" className="r-stretch" />
        </Section>
        <Section>
          <h2>Proposition de valeur</h2>
          <p style={{ textAlign: 'left', marginBottom: 0 }}>Pour les réalisateurs :</p>
          <img src={Directors} alt="Proposition de valeur de Claptime pour les réalisateurs" className="r-stretch" />
        </Section>
        <Section>
          <h2 id="magic">Underlying magic <span role="img" aria-labelledby="magic">✨</span></h2>
          <List>
            <li>Une architecture technique robuste, serverless et <a href="https://aws.amazon.com/blogs/startups/startup-architecture-of-the-year-challenge-aws/" target="_blank" rel="noopener noreferrer" title="Claptime finaliste du AWS Startup Architecture of the Year 2020">reconnue</a></li>
            <li>Une expérience utilisateur aboutie qui crée du lien entre un réalisateur et son public</li>
            <li>Un système de recommandations collaboratif qui favorise la diversité</li>
          </List>
        </Section>
        <Section>
          <h2>Un modèle économique vertueux</h2>
          <p>Nous prélevons une commission de 25% des dons effectués.<br />Le succès de Claptime est conditionné à celui des réalisateurs.</p>
        </Section>
        <Section>
          <h2>Stratégie de développement</h2>
          <List>
            <li>Création de partenariats avec des acteurs du milieu du cinéma</li>
            <li>Développement de l'écosystème et de la communauté Claptime (média, rencontres, projections...)</li>
            <li>Développement de la plateforme
              <ul>
                <li>accès à des contenus exclusifs pour les donateurs</li>
                <li>financement participatif en amont de la production</li>
                <li>organisation de festivals en ligne</li>
              </ul>
            </li>
          </List>
        </Section>
        <Section>
          <h2>Métriques</h2>
          <List>
            <li>
              <b>Croissance</b>
              <ul>
                <li>Nombre de réalisateurs et nombre de films disponibles</li>
                <li>Nombre total d'utilisateurs inscrits</li>
              </ul>
            </li>
            <li>
              <b>Engagement utilisateur</b>
              <ul>
                <li>Nombre de films vus / utilisateur / mois</li>
                <li>Nombre de dons / utilisateur / mois</li>
              </ul>
            </li>
            <li>
              <b>Monétisation</b>
              <ul>
                <li>Nombre de dons / Nombre de films vus</li>
                <li>Montant moyen des dons</li>
              </ul>
            </li>
          </List>
        </Section>
        <Section>
          <h2>Nos engagements</h2>
          <List>
            <li>
              Sobriété numérique&nbsp;
              <a href="https://theshiftproject.org/article/pour-une-sobriete-numerique-rapport-shift/" className="icon-link super" target="_blank" rel="noopener noreferrer" title="En savoir plus">
                <i className="fas fa-info-circle" />
              </a>
            </li>
            <li>
              Transparence
              <ul>
                <li>financière envers les réalisateurs</li>
                <li>sur l'utilisation des données personnelles</li>
              </ul>
            </li>
            <li>
              Principes de l'entrepreunariat social&nbsp;
              <a href="http://mouves.org/lentrepreneuriat-social/l-entrepreneuriat-social/" className="icon-link super" target="_blank" rel="noopener noreferrer" title="En savoir plus">
                <i className="fas fa-info-circle" />
              </a>
            </li>
          </List>
        </Section>
        <Section>
          <h2>L'équipe</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <StyledAvatar>
              <img className="avatar" src={Thibaut} alt="Thibaut Chamoux" />
              <span className="name">Thibaut Chamoux</span>
              <span className="title">« Le social businessman »</span>
              <div className="links">
                <a href="https://www.linkedin.com/in/thibaut-chamoux-34845295/" className="icon-link" target="_blank" rel="noopener noreferrer" title="Profil LinkedIn">
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </StyledAvatar>
            <StyledAvatar>
              <img className="avatar" src={Christophe} alt="Christophe Bougère" />
              <span className="name">Christophe Bougère</span>
              <span className="title">« L'architecte »</span>
              <div className="links">
                <a href="https://www.linkedin.com/in/christophebougere/" className="icon-link" target="_blank" rel="noopener noreferrer" title="Profil LinkedIn">
                  <i className="fab fa-linkedin" />
                </a>
                <a href="https://github.com/ChristopheBougere/" className="icon-link" target="_blank" rel="noopener noreferrer" title="Profil GitHub">
                  <i className="fab fa-github" />
                </a>
                <a href="https://medium.com/@christophe.bougere" className="icon-link" target="_blank" rel="noopener noreferrer" title="Blog">
                  <i className="fab fa-medium" />
                </a>
              </div>
            </StyledAvatar>
          </div>
        </Section>
        <Section background="landing" showBonus>
          <Prompt align="left">Coupez,<br />elle est bonne !</Prompt>
          <br />
          <p style={{ fontSize: '0.7em' }}>
            Une question ?<br />
            <a href="mailto:hello@clap-time.com">hello@clap-time.com</a>
          </p>
        </Section>
      </div>
    </StyledContainer>
  );
};

export default App;
