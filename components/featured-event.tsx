import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FeaturedEvent() {
  // Dados do evento Tomorrowland Brasil
  const event = {
    id: 2,  // ID do evento para correspondência com event-card.tsx
    title: "Tomorrowland Brasil 2025",
    description: "O maior festival de música eletrônica do mundo chega ao Brasil com uma experiência mágica e imersiva. Apresentando os melhores DJs internacionais em 5 palcos diferentes com produção de última geração em um ambiente mágico e inesquecível.",
    date: "Maio 15, 2025",
    location: "São Paulo, Brasil",
    price: "450.00",
    // URL de imagem atualizada que funciona
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format"
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 rounded-2xl overflow-hidden border border-gray-100 bg-white">
      <div className="relative h-[300px] lg:h-auto overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
          Evento Patrocinado
        </Badge>
      </div>
      <div className="p-6 lg:p-8 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
          <p className="text-gray-600 mb-6">
            {event.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="flex-1 rounded-full bg-black text-white hover:bg-gray-800"
          >
            <Link href={`/events/${event.id}`}>Comprar ingressos</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto px-8 rounded-full bg-black text-white hover:bg-gray-800"
          >
          </Button>
        </div>
      </div>
    </div>
  )
}

