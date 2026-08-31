const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-earth px-6 text-center text-cream">
    <p className="font-display text-6xl text-gradient-sun">404</p>
    <h1 className="mt-4 font-display text-2xl">Esta página não existe</h1>
    <p className="mt-3 max-w-sm text-sm text-cream/70">
      O caminho que você procurava não está aqui — mas a jornada continua.
    </p>
    <a
      href="/"
      className="mt-8 rounded-full bg-gradient-sun px-7 py-3.5 text-sm font-bold text-maroon transition-transform hover:scale-105"
    >
      Voltar ao início
    </a>
  </div>
);

export default NotFound;
