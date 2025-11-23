import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section d-flex flex-column justify-content-center align-items-center text-center py-5">
        <div className="container mt-5">
          <h1 className="fw-bold display-4 mb-3 text-white">
            Welcome to <span style={{ color: '#d1a679' }}>MochaMagic</span>
          </h1>
          <p className="lead text-light mb-4">Have a brewlicious day ☕</p>
          <Link href="/menu" className="btn btn-primary btn-lg">
            Explore Menu
          </Link>
        </div>
      </header>

      {/* Why Choose Us */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Why Choose MochaMagic?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Premium Quality</h5>
                <p className="card-text">
                  Sourced from the finest beans for a rich, authentic flavor.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Cozy Ambiance</h5>
                <p className="card-text">
                  A perfect spot to relax, work, or catch up with friends.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Exceptional Service</h5>
                <p className="card-text">
                  Friendly baristas dedicated to crafting your perfect cup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

