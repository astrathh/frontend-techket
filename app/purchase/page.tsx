"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Calendar, MapPin, Clock, Download, QrCode, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import Header from "@/components/layout/header";
import { useAuth } from "@/lib/auth-context";

// Tipo para os dados da API
interface PurchaseEvent {
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  id?: string;
  status?: "upcoming" | "past" | "canceled";
  imageUrl?: string;
}

// Tipo para os tickets formatados para exibição
interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketType: string;
  quantity: number;
  price: number;
  purchaseDate: string;
  status: "upcoming" | "past" | "canceled";
  imageUrl: string;
}

export default function PurchaseHistoryPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    // Função para buscar os dados da API
    const fetchPurchaseHistory = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Obter o token do localStorage usando a chave correta "auth_token"
        let authToken = localStorage.getItem("auth_token");
        
        // Log para debugging
        console.log("Token encontrado com a chave auth_token:", authToken ? "Sim" : "Não");
        
        // Verificar se o token é um objeto/array JSON e extrair o valor correto
        if (authToken) {
          try {
            // Tentar fazer o parse do token para verificar se é um JSON
            const parsedToken = JSON.parse(authToken);
            
            // Se for um array, pegar o primeiro item
            if (Array.isArray(parsedToken)) {
              console.log("Token está armazenado como array, usando primeiro item");
              authToken = parsedToken[0];
            } 
            // Se for um objeto, tentar identificar o campo que contém o token
            else if (typeof parsedToken === 'object') {
              console.log("Token está armazenado como objeto, tentando extrair token");
              // Tentar campos comuns onde o token pode estar
              authToken = parsedToken.token || parsedToken.access_token || parsedToken.accessToken || Object.values(parsedToken)[0];
            }
          } catch (e) {
            // Se não for um JSON válido, manter o valor original
            console.log("Token não é um JSON, usando valor literal");
          }
        }
        
        // Log para debugging
        console.log("Token final usado para autenticação:", 
                   authToken ? (typeof authToken === 'string' ? "Token válido" : "Token não é string") : "Token não encontrado");
        
        if (!authToken || typeof authToken !== 'string') {
          console.log("Token não encontrado ou inválido, usando dados mockados");
          setTickets(getMockTickets());
          setIsLoading(false);
          return;
        }
        
        // Buscar dados da API com o token processado
        const response = await fetch("http://localhost:3000/purchase/history", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json",
          }
        });
        
        console.log("Status da resposta:", response.status);
        
        if (response.status === 401) {
          console.log("Token inválido ou expirado, usando dados mockados");
          // Usar dados mockados em vez de redirecionar
          setTickets(getMockTickets());
          setIsLoading(false);
          return;
        }
        
        if (!response.ok) {
          console.log(`API retornou status ${response.status}, usando dados mockados`);
          setTickets(getMockTickets());
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        
        // Converter os dados da API para o formato que esperamos exibir
        const formattedTickets = formatApiDataToTickets(data);
        setTickets(formattedTickets);
      } catch (err) {
        console.error("Erro ao buscar histórico de compras:", err);
        
        // Usar dados mockados em caso de erro
        console.log("Erro capturado, usando dados mockados");
        setTickets(getMockTickets());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPurchaseHistory();
  }, [isAuthenticated, router]);

  // Formatar dados da API para o formato de exibição
  const formatApiDataToTickets = (apiData: any): Ticket[] => {
    console.log("Formato dos dados recebidos:", JSON.stringify(apiData).substring(0, 300));
    
    // Se não houver dados, retornar array vazio
    if (!apiData) return [];
    
    try {
      // Se recebermos um único objeto em vez de um array
      if (!Array.isArray(apiData)) {
        // Verificar se temos uma propriedade data que contém o array
        if (apiData.data && Array.isArray(apiData.data)) {
          apiData = apiData.data;
        } else {
          apiData = [apiData];
        }
      }
      
      // Verificar o formato do primeiro item para determinar a estrutura
      if (apiData.length > 0) {
        const firstItem = apiData[0];
        console.log("Estrutura do primeiro item:", JSON.stringify(firstItem));
        
        // Se o objeto tem uma propriedade 'event', significa que estamos lidando com compras
        // que contêm uma referência ao evento
        if (firstItem.event) {
          return apiData.map((purchase: any) => {
            const event = purchase.event;
            
            // Converter string de data para objeto Date
            const eventDate = new Date(event.date);
            
            // Determinar se o evento é passado ou futuro
            const isPast = eventDate < new Date();
            
            return {
              id: `tkt-${purchase.id}`,
              eventId: `evt-${event.id}`,
              eventName: event.title,
              eventDate: eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
              eventTime: eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + " - " +
                        new Date(eventDate.getTime() + 3 * 60 * 60 * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              eventLocation: event.location,
              ticketType: "Ingresso Padrão",
              quantity: 1,
              price: event.price,
              purchaseDate: new Date(purchase.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
              status: isPast ? "past" : "upcoming",
              imageUrl: event.imageUrl || "/placeholder.svg?height=600&width=1200"
            };
          });
        }
      }
      
      // Formato original - usado se o formato acima não for detectado
      return apiData.map((event: PurchaseEvent, index: number) => {
        // Converter string de data para objeto Date
        const eventDate = new Date(event.date);
        
        // Determinar se o evento é passado ou futuro
        const isPast = eventDate < new Date();
        
        // Gerar um ID único para cada ticket
        const uniqueId = `tkt-${Math.floor(Math.random() * 1000000)}-${Date.now()}`;
        
        return {
          id: event.id || uniqueId,
          eventId: event.id || `evt-${uniqueId}`,
          eventName: event.title,
          eventDate: eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
          eventTime: eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + " - " +
                    new Date(eventDate.getTime() + 3 * 60 * 60 * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          eventLocation: event.location,
          ticketType: "Ingresso Padrão", // Usar valor padrão se não fornecido
          quantity: 1, // Usar valor padrão se não fornecido
          price: event.price,
          purchaseDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: event.status || (isPast ? "past" : "upcoming"),
          imageUrl: event.imageUrl || "/placeholder.svg?height=600&width=1200" // Usar placeholder se não fornecido
        };
      });
    } catch (error) {
      console.error("Erro ao formatar dados da API:", error);
      // Em caso de erro na formatação, retornar array vazio
      return [];
    }
  };

  // Dados mockados para quando a API falhar
  const getMockTickets = (): Ticket[] => {
    return [
      {
        id: "tkt-1234567",
        eventId: "evt-123",
        eventName: "Rock in Rio",
        eventDate: "20 mar 2025",
        eventTime: "10:00 - 23:00",
        eventLocation: "Rio de Janeiro",
        ticketType: "VIP Package",
        quantity: 2,
        price: 300,
        purchaseDate: "15 Mar 2025",
        status: "upcoming",
        imageUrl: "/placeholder.svg?height=600&width=1200"
      },
      {
        id: "tkt-2345678",
        eventId: "evt-456",
        eventName: "Summer Music Festival",
        eventDate: "15 Jun 2025",
        eventTime: "12:00 - 23:00",
        eventLocation: "Central Park, New York",
        ticketType: "General Admission",
        quantity: 3,
        price: 269.97,
        purchaseDate: "10 Mar 2025",
        status: "upcoming",
        imageUrl: "/placeholder.svg?height=600&width=1200"
      },
      {
        id: "tkt-3456789",
        eventId: "evt-789",
        eventName: "Tech Conference 2025",
        eventDate: "10 Fev 2025",
        eventTime: "9:00 - 17:00",
        eventLocation: "Moscone Center, San Francisco",
        ticketType: "Premium Seats",
        quantity: 1,
        price: 129.99,
        purchaseDate: "15 Jan 2025",
        status: "past",
        imageUrl: "/placeholder.svg?height=600&width=1200"
      }
    ];
  };

  // Filtrar tickets com base na busca
  const filteredTickets = tickets.filter(ticket => 
    ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.eventLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.ticketType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separar tickets por status
  const upcomingTickets = filteredTickets.filter(ticket => ticket.status === "upcoming");
  const pastTickets = filteredTickets.filter(ticket => ticket.status === "past");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Ingressos</h1>
          <p className="text-gray-600">
            Visualize e gerencie todos os seus ingressos adquiridos
          </p>
        </div>

        <div className="w-full mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por evento, local ou tipo de ingresso..."
              className="pl-10 rounded-full border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-50 mb-6">
            <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="past">Eventos Passados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin h-6 w-6 border-2 border-black border-t-transparent rounded-full"></div>
                <span className="ml-3 text-gray-600">Carregando seus ingressos...</span>
              </div>
            ) : upcomingTickets.length > 0 ? (
              <div className="space-y-6">
                {upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-medium mb-2">Sem eventos futuros</h3>
                <p className="text-gray-600 mb-4">
                  Você não possui ingressos para eventos futuros.
                </p>
                <Link href="/events">
                  <Button className="rounded-full bg-black text-white hover:bg-gray-800">
                    Explorar Eventos
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin h-6 w-6 border-2 border-black border-t-transparent rounded-full"></div>
                <span className="ml-3 text-gray-600">Carregando seus ingressos...</span>
              </div>
            ) : pastTickets.length > 0 ? (
              <div className="space-y-6">
                {pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} isPast={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-lg font-medium mb-2">Sem eventos passados</h3>
                <p className="text-gray-600">
                  Você ainda não participou de nenhum evento.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
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
  );
}

// Componente de Card de Ticket
function TicketCard({ ticket, isPast = false }: { ticket: Ticket; isPast?: boolean }) {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="relative md:col-span-1">
          <img 
            src={ticket.imageUrl} 
            alt={ticket.eventName} 
            className="w-full h-48 md:h-full object-cover" 
          />
          {isPast && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                Evento Finalizado
              </span>
            </div>
          )}
        </div>
        <div className="p-6 md:col-span-3">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{ticket.eventName}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {ticket.eventDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {ticket.eventTime}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {ticket.eventLocation}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:text-right">
              <div className="text-sm text-gray-600">Código do Ingresso</div>
              <div className="font-medium">{ticket.id}</div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Detalhes do Ingresso</p>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tipo:</span>
                  <span className="font-medium">{ticket.ticketType}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Quantidade:</span>
                  <span className="font-medium">{ticket.quantity}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Valor Total:</span>
                  <span className="font-medium">R$ {ticket.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data da Compra:</span>
                  <span className="font-medium">{ticket.purchaseDate}</span>
                </div>
              </div>
              
              <div className="flex items-end justify-end md:justify-end space-x-3 mt-4 md:mt-0">
                {!isPast && (
                  <Button 
                    variant="outline" 
                    className="rounded-full flex items-center gap-1"
                  >
                    <QrCode className="h-4 w-4 mr-1" />
                    Ver QR Code
                  </Button>
                )}
                <Button 
                  variant={isPast ? "default" : "outline"} 
                  className={`rounded-full flex items-center gap-1 ${
                    isPast ? "bg-black text-white hover:bg-gray-800" : ""
                  }`}
                >
                  <Download className="h-4 w-4 mr-1" />
                  {isPast ? "Certificado" : "Baixar Ingresso"}
                </Button>
              </div>
            </div>
          </div>
          
          {!isPast && (
            <div className="flex justify-end mt-4">
              <Link href={`/events/${ticket.eventId}`}>
                <Button 
                  variant="ghost" 
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  Ver detalhes do evento
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}