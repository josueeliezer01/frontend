//src/pages/AboutPage/AboutPage.jsx
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <main className="about-container">
      <h1>Sobre Nós</h1>

      <section className="about-story">
        <h2>Nossa História</h2>
        <p>
          Fundada em 2018 por dois apaixonados por esporte e nutrição, a Zumub
          nasceu na garagem de casa com uma missão: levar suplementos de alta
          qualidade a todos, do atleta amador àquele que busca saúde e
          bem-estar. Em poucos meses, crescemos de um pequeno e-commerce local
          para uma plataforma que atende clientes por todo o Brasil, sempre com
          o compromisso de inovação e transparência.
        </p>
      </section>

      <section className="about-mission">
        <h2>Nossos Objetivos</h2>
        <ul>
          <li>
            <strong>Qualidade em primeiro lugar:</strong> só trabalhamos com
            marcas testadas e certificadas.
          </li>
          <li>
            <strong>Preço justo:</strong> negociamos diretamente com fabricantes
            para oferecer o melhor custo-benefício.
          </li>
          <li>
            <strong>Atendimento humanizado:</strong> cada cliente é único e
            merece suporte dedicado.
          </li>
          <li>
            <strong>Conteúdo especializado:</strong> artigos, receitas e guias
            desenvolvidos por nutricionistas e profissionais de educação física.
          </li>
        </ul>
      </section>

      <section className="about-vision">
        <h2>Visão de Futuro</h2>
        <p>
          Queremos ser referência em nutrição esportiva e saúde online na
          América Latina, criando uma comunidade engajada que inspira
          transformação de corpo e mente.
        </p>
      </section>
    </main>
  );
}
