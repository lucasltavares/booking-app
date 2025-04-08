<script setup>
import { ref, computed, onMounted } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Lista de clientes (exemplo)
const clients = ref([
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    status: 'Ativo',
    lastVisit: '25/03/2024',
    totalAppointments: 5,
  },
  {
    id: 2,
    name: 'Ana Souza',
    email: 'ana.souza@email.com',
    phone: '(11) 91234-5678',
    status: 'Ativo',
    lastVisit: '20/03/2024',
    totalAppointments: 3,
  },
  {
    id: 3,
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    phone: '(11) 94567-8901',
    status: 'Inativo',
    lastVisit: '15/02/2024',
    totalAppointments: 2,
  },
  {
    id: 4,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(11) 92345-6789',
    status: 'Ativo',
    lastVisit: '10/03/2024',
    totalAppointments: 4,
  },
  {
    id: 5,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 95678-1234',
    status: 'Inativo',
    lastVisit: '05/02/2024',
    totalAppointments: 1,
  },
  {
    id: 6,
    name: 'Beatriz Costa',
    email: 'beatriz.costa@email.com',
    phone: '(11) 94567-1234',
    status: 'Ativo',
    lastVisit: '28/03/2024',
    totalAppointments: 6,
  },
  {
    id: 7,
    name: 'Rafael Mendes',
    email: 'rafael.mendes@email.com',
    phone: '(11) 91234-5678',
    status: 'Ativo',
    lastVisit: '27/03/2024',
    totalAppointments: 3,
  },
  {
    id: 8,
    name: 'Carolina Ferreira',
    email: 'carolina.ferreira@email.com',
    phone: '(11) 92345-6789',
    status: 'Inativo',
    lastVisit: '20/02/2024',
    totalAppointments: 2,
  },
  {
    id: 9,
    name: 'Lucas Almeida',
    email: 'lucas.almeida@email.com',
    phone: '(11) 95678-1234',
    status: 'Ativo',
    lastVisit: '26/03/2024',
    totalAppointments: 4,
  },
  {
    id: 10,
    name: 'Juliana Rodrigues',
    email: 'juliana.rodrigues@email.com',
    phone: '(11) 94567-8901',
    status: 'Ativo',
    lastVisit: '25/03/2024',
    totalAppointments: 5,
  },
  {
    id: 11,
    name: 'Marcos Santos',
    email: 'marcos.santos@email.com',
    phone: '(11) 91234-5678',
    status: 'Inativo',
    lastVisit: '15/02/2024',
    totalAppointments: 1,
  },
  {
    id: 12,
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 92345-6789',
    status: 'Ativo',
    lastVisit: '24/03/2024',
    totalAppointments: 3,
  },
  {
    id: 13,
    name: 'Gustavo Silva',
    email: 'gustavo.silva@email.com',
    phone: '(11) 95678-1234',
    status: 'Ativo',
    lastVisit: '23/03/2024',
    totalAppointments: 2,
  },
  {
    id: 14,
    name: 'Patricia Costa',
    email: 'patricia.costa@email.com',
    phone: '(11) 94567-8901',
    status: 'Inativo',
    lastVisit: '10/02/2024',
    totalAppointments: 1,
  },
  {
    id: 15,
    name: 'Roberto Almeida',
    email: 'roberto.almeida@email.com',
    phone: '(11) 91234-5678',
    status: 'Ativo',
    lastVisit: '22/03/2024',
    totalAppointments: 4,
  },
])

// Estado para busca e filtros
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 5
const isSearching = ref(false)
const showAddModal = ref(false)
const isLoading = ref(true)

// Simular carregamento inicial
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

// Form data
const newClient = ref({
  name: '',
  email: '',
  phone: '',
  status: 'Ativo',
})

// Lista de cores para os avatares
const avatarColors = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-info',
  'bg-success',
  'bg-warning',
  'bg-error',
  'bg-neutral',
]

// Função para obter uma cor aleatória baseada no ID do cliente
const getAvatarColor = (id) => {
  return avatarColors[id % avatarColors.length]
}

// Computed properties para filtragem e paginação
const filteredClients = computed(() => {
  return clients.value.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      client.phone.includes(searchQuery.value)

    const matchesStatus =
      !statusFilter.value || client.status.toLowerCase() === statusFilter.value.toLowerCase()

    return matchesSearch && matchesStatus
  })
})

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredClients.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredClients.value.length / itemsPerPage)
})

// Funções de paginação
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Definir cor do status
const statusClass = (status) => {
  return status === 'Ativo' ? 'badge-success' : 'badge-error'
}

// Função para adicionar novo cliente
const addNewClient = () => {
  showAddModal.value = true
}

// Função para salvar novo cliente
const saveNewClient = () => {
  // Adicionar o novo cliente à lista
  clients.value.push({
    id: clients.value.length + 1,
    ...newClient.value,
    lastVisit: new Date().toLocaleDateString('pt-BR'),
    totalAppointments: 0,
  })

  // Limpar o formulário e fechar o modal
  newClient.value = {
    name: '',
    email: '',
    phone: '',
    status: 'Ativo',
  }
  showAddModal.value = false
}

// Função para editar cliente
const editClient = (client) => {
  // Implementar lógica de editar cliente
  console.log('Editar cliente:', client)
}

// Função para excluir cliente
const deleteClient = (client) => {
  // Implementar lógica de excluir cliente
  console.log('Excluir cliente:', client)
}

// Resetar paginação quando a busca ou filtro mudar
const handleSearch = () => {
  isSearching.value = true
  currentPage.value = 1 // Resetar para primeira página ao buscar

  // Simular um pequeno delay para mostrar o loading
  setTimeout(() => {
    isSearching.value = false
  }, 300)
}

const handleStatusChange = () => {
  currentPage.value = 1 // Resetar para primeira página ao mudar filtro
}

// Função para exportar para PDF
const exportToPDF = () => {
  const doc = new jsPDF()

  // Configurar o título
  doc.setFontSize(20)
  doc.text('Lista de Clientes', 14, 15)
  doc.setFontSize(10)
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, 25)

  // Preparar os dados para a tabela
  const tableData = filteredClients.value.map((client) => [
    client.name,
    client.email,
    client.phone,
    client.status,
    client.lastVisit,
    client.totalAppointments.toString(),
  ])

  // Configurar e gerar a tabela
  autoTable(doc, {
    head: [['Nome', 'E-mail', 'Telefone', 'Status', 'Última Visita', 'Total de Agendamentos']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 50 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
    },
  })

  // Salvar o PDF
  doc.save('clientes.pdf')
}

// Função para exportar para CSV
const exportToCSV = () => {
  // Cabeçalhos do CSV
  const headers = ['Nome', 'E-mail', 'Telefone', 'Status', 'Última Visita', 'Total de Agendamentos']

  // Dados dos clientes
  const csvData = filteredClients.value.map((client) => [
    client.name,
    client.email,
    client.phone,
    client.status,
    client.lastVisit,
    client.totalAppointments.toString(),
  ])

  // Converter para string CSV
  const csvContent = [headers.join(','), ...csvData.map((row) => row.join(','))].join('\n')

  // Criar blob e link para download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', 'clientes.csv')
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="p-6">
    <!-- Breadcrumb -->
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><a href="/dashboard">Home</a></li>
        <li class="text-gray-500">Clientes</li>
      </ul>
    </div>

    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold">👥 Clientes</h1>
        <p class="text-gray-500">Gerencie seus clientes e suas informações</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div class="dropdown dropdown-end w-full sm:w-auto">
          <button tabindex="0" class="btn btn-outline w-full sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            Exportar
          </button>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button @click="exportToPDF" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                PDF
              </button>
            </li>
            <li>
              <button @click="exportToCSV" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                CSV
              </button>
            </li>
          </ul>
        </div>
        <button class="btn btn-primary w-full sm:w-auto" @click="addNewClient">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Novo Cliente
        </button>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="card bg-base-100 shadow-lg mb-6">
      <div class="card-body">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="form-control flex-1">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                placeholder="Buscar clientes..."
                class="input input-bordered w-full pr-10"
              />
              <div v-if="isSearching" class="absolute right-3 top-1/2 -translate-y-1/2">
                <span class="loading loading-spinner loading-sm text-primary"></span>
              </div>
            </div>
          </div>
          <div class="form-control">
            <select
              v-model="statusFilter"
              @change="handleStatusChange"
              class="select select-bordered"
            >
              <option value="">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Clients Table -->
    <div class="card bg-base-100 shadow-lg">
      <div class="card-body">
        <div class="overflow-x-auto">
          <!-- Skeleton Loading -->
          <div v-if="isLoading" class="w-full">
            <div class="space-y-4">
              <div
                v-for="n in 5"
                :key="n"
                class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-4 border-b border-base-200"
              >
                <div class="skeleton bg-base-200 w-8 h-8 rounded-full"></div>
                <div class="flex-1 space-y-2 w-full sm:w-auto">
                  <div class="skeleton bg-base-200 h-4 w-32"></div>
                  <div class="skeleton bg-base-200 h-3 w-40"></div>
                </div>
                <div class="skeleton bg-base-200 h-6 w-16"></div>
                <div class="skeleton bg-base-200 h-4 w-24"></div>
                <div class="skeleton bg-base-200 h-4 w-8"></div>
                <div class="flex gap-2">
                  <div class="skeleton bg-base-200 h-8 w-8"></div>
                  <div class="skeleton bg-base-200 h-8 w-8"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabela de Clientes -->
          <table v-else class="table w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th class="hidden sm:table-cell">Contato</th>
                <th>Status</th>
                <th class="hidden md:table-cell">Última Visita</th>
                <th class="hidden lg:table-cell">Total de Agendamentos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="client in paginatedClients"
                :key="client.id"
                class="border-b border-base-200"
              >
                <td>
                  <div class="flex items-center">
                    <div class="avatar placeholder">
                      <div
                        :class="[getAvatarColor(client.id), 'text-white']"
                        class="rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <span class="text-sm font-medium" style="margin: 10px">{{
                          client.name.charAt(0).toUpperCase()
                        }}</span>
                      </div>
                    </div>
                    <div class="ml-3">
                      <div class="font-medium">{{ client.name }}</div>
                      <div class="text-sm text-gray-500 sm:hidden">{{ client.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="hidden sm:table-cell">
                  <div>{{ client.email }}</div>
                  <div class="text-sm text-gray-500">{{ client.phone }}</div>
                </td>
                <td>
                  <span :class="statusClass(client.status)" class="badge">
                    {{ client.status }}
                  </span>
                </td>
                <td class="hidden md:table-cell">{{ client.lastVisit }}</td>
                <td class="hidden lg:table-cell">{{ client.totalAppointments }}</td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="editClient(client)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost" @click="deleteClient(client)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-error"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="!isLoading" class="flex justify-center mt-6">
          <div class="join">
            <button class="join-item btn" :disabled="currentPage === 1" @click="previousPage">
              «
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              class="join-item btn"
              :class="{ 'btn-active': currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
              »
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Novo Cliente -->
    <dialog :open="showAddModal" class="modal">
      <div class="modal-box w-11/12 max-w-2xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg mb-4">Adicionar Novo Cliente</h3>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Nome Completo</span>
          </label>
          <input
            type="text"
            v-model="newClient.name"
            placeholder="Digite o nome do cliente"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">E-mail</span>
          </label>
          <input
            type="email"
            v-model="newClient.email"
            placeholder="Digite o e-mail do cliente"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">Telefone</span>
          </label>
          <input
            type="tel"
            v-model="newClient.phone"
            placeholder="(00) 00000-0000"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mt-4">
          <label class="label">
            <span class="label-text">Status</span>
          </label>
          <select v-model="newClient.status" class="select select-bordered w-full">
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Cancelar</button>
            <button
              class="btn btn-primary"
              @click="saveNewClient"
              :disabled="!newClient.name || !newClient.email || !newClient.phone"
            >
              Salvar Cliente
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.avatar.placeholder {
  background-color: transparent;
}

/* Estilo para o modal */
.modal-box {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Estilo para o backdrop do modal */
.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Animação suave para o modal */
.modal {
  transition: all 0.3s ease-in-out;
}

.modal[open] {
  animation: modal-pop 0.3s ease-out;
}

@keyframes modal-pop {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
