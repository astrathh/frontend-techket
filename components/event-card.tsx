import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Array de eventos fixos com IDs diferentes
const events = [
  {
    id: 1,
    title: "Festival de Música de Verão 2025",
    description: "Junte-se a nós para um dia inesquecível de música, gastronomia e diversão no Festival de Música de Verão anual.",
    date: "15 Mar, 2025",
    location: "Rio de Janeiro",
    price: "149",
    category: "Música",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format",
    stock: "Ingressos limitados"
  },
  {
    id: 2,
    title: "Tomorrowland Brasil 2025",
    description: "O maior festival de música eletrônica do mundo chega ao Brasil com uma experiência mágica e imersiva.",
    date: "Maio 15, 2025",
    location: "São Paulo",
    price: "449",
    category: "Festival",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format",
    stock: "Últimas unidades"
  },
  {
    id: 3,
    title: "Festival Gastronômico Internacional",
    description: "Um evento para os amantes da gastronomia com mais de 50 chefs internacionais e workshops culinários.",
    date: "Jul 10, 2025",
    location: "Curitiba",
    price: "179",
    category: "Comida",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format",
    stock: "Disponível"
  },
  {
    id: 4,
    title: "TechSummit 2025",
    description: "A maior conferência de tecnologia e inovação da América Latina com palestrantes internacionais.",
    date: "Set 05, 2025",
    location: "Belo Horizonte",
    price: "289",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format",
    stock: "Acesso antecipado"
  },
  {
    id: 5,
    title: "Coldplay: Music of the Spheres Tour",
    description: "A aguardada turnê mundial Music of the Spheres do Coldplay chega ao Brasil com um espetáculo impressionante.",
    date: "Jun 22, 2025",
    location: "Rio de Janeiro",
    price: "349",
    category: "Concerto",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format",
    stock: "Últimas unidades"
  },
  {
    id: 6,
    title: "Comic Con Experience 2025",
    description: "O maior evento de cultura pop da América Latina com convidados internacionais, painéis e muito mais.",
    date: "Dez 05, 2025",
    location: "São Paulo",
    price: "219",
    category: "Entretenimento",
    image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=1000&auto=format",
    stock: "Disponível"
  }
];

// Componente que aceita um ID opcional para mostrar um evento específico
export default function EventCard({ eventId = 0 }) {
  // Se um ID for passado, mostrar esse evento específico
  // Caso contrário, escolher um evento aleatório da lista
  const event = eventId > 0 
    ? events.find(e => e.id === eventId) || events[0]
    : events[Math.floor(Math.random() * events.length)];

  return (
    <Link href={`/events/${event.id}`} className="group">
      <div className="overflow-hidden rounded-xl bg-white border border-gray-100 transition-all hover:shadow-md">
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-white text-black hover:bg-gray-100">{event.category}</Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-600">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">A partir de R${event.price}</span>
            <span className="text-xs text-gray-500">{event.stock}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}