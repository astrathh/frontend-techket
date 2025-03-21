import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"
import FeaturedEvent from "@/components/featured-event"
import Header from "@/components/layout/header" // Importar o componente Header

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Usar o componente de Header separado */}
      <Header />

      {/* Hero Section */}
      <section className="container py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Vivencie os melhores eventos perto de você
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Encontre e compre ingressos para os melhores eventos de música, esportes, teatro e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Pesquise eventos, artistas, locais..."
                  className="pl-10 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-gray-200"
                />
              </div>
              <Button className="rounded-full bg-black text-white hover:bg-gray-800">Pesquisar</Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80://images.unsplash.com/photo-1600373669762-150bec907fe8?q=80&w=1974&auto=format&fit=crop"
              alt="Festival de carros coloridos"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Em destaque</h2>
            <Link
              href="/events"
              className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              Ver todos <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <FeaturedEvent />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Próximos eventos</h2>
          <Link
            href="/events"
            className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            Ver todos <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <EventCard key={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Pesquisar por Categoria</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Concertos", "Esportes", "Teatro", "Festivais", "Comédia", "Arte", "Família", "Workshops"].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="group relative h-40 overflow-hidden rounded-xl bg-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-medium text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gray-50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Nunca perca um evento</h2>
              <p className="text-gray-600">
                Increva-se na nossa comunidade e fique por dentro de todas a novidades exclusivas sobre novos eventos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Digite seu e-mail"
                className="rounded-full border-gray-200 bg-white focus-visible:ring-gray-200"
              />
              <Button className="rounded-full bg-black text-white hover:bg-gray-800 whitespace-nowrap">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Techket</h3>
              <p className="text-sm text-gray-600 mb-4">
                O melhor lugar para encontrar seu próximo evento.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Sobre nós</h3>
              <ul className="space-y-2">
                {["Sobre", "Carreiras", "Blog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Suporte</h3>
              <ul className="space-y-2">
                {["Centro de ajuda", "Fale conosco", "FAQs", "Política de reembolso"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Termos de Serviço", "Política de Privacidade", "Política de Cookes", "Accessibilidade"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Techket. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <Link key={social} href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

