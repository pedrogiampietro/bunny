import rubinImg from '@/assets/servers/rubinot.jpg'
import deusImg from '@/assets/servers/deusot.jpg'
import taleonImg from '@/assets/servers/taleon.jpg'

export const clients = [
  {
    id: 1,
    name: 'RubinOT',
    version: '1.0.0',
    ip: '192.168.0.1',
    exp: '2x',
    description: 'Servidor 1',
    online: 600,
    cover: rubinImg,
    releaseDate: '2022-01-15',
    company: 'Rubin Games',
    about: 'RubinOT é um servidor emocionante com muitas aventuras e desafios.',
    systemRequirements: [
      {
        memory: '1GB RAM',
        os: 'Windows 10',
        processor: '1.5 GHz Pentium 4 ou equivalente com suporte SSE2',
        grapic:
          '128MB; se DirectX 9c ou OpenGL 2.1 não forem suportados, somente o modo software renderer estará disponível (sem efeito de luz)',
        hardDriver: 'min. 150 MB'
      }
    ],
    comments: [
      {
        user: 'Player1',
        comment: 'Ótimo Servidor!',
        date: '2023-01-01',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      },
      {
        user: 'Player2',
        comment: 'Muita diversão!',
        date: '2023-02-15',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      }
    ]
  },
  {
    id: 2,
    name: 'DeusOT',
    version: '1.0.0',
    ip: '192.168.0.2',
    exp: '3x',
    description: 'Servidor 2',
    online: 600,
    cover: deusImg,
    releaseDate: '2022-05-20',
    company: 'Deus Entertainment',
    about: 'DeusOT oferece uma experiência única e envolvente.',
    systemRequirements: [
      {
        memory: '1GB RAM',
        os: 'Windows 10',
        processor: '1.5 GHz Pentium 4 ou equivalente com suporte SSE2',
        grapic:
          '128MB; se DirectX 9c ou OpenGL 2.1 não forem suportados, somente o modo software renderer estará disponível (sem efeito de luz)',
        hardDriver: 'min. 150 MB'
      }
    ],
    comments: [
      {
        user: 'Player3',
        comment: 'Incrível!',
        date: '2023-03-12',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      },
      {
        user: 'Player4',
        comment: 'Muito bom!',
        date: '2023-04-10',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      }
    ]
  },
  {
    id: 3,
    name: 'Taleon',
    version: '1.0.0',
    ip: '192.168.0.3',
    exp: '4x',
    description: 'Servidor 3',
    online: 600,
    cover: taleonImg,
    releaseDate: '2023-01-10',
    company: 'Taleon Studios',
    about: 'Taleon é perfeito para quem busca aventuras épicas.',
    systemRequirements: [
      {
        memory: '1GB RAM',
        os: 'Windows 10',
        processor: '1.5 GHz Pentium 4 ou equivalente com suporte SSE2',
        grapic:
          '128MB; se DirectX 9c ou OpenGL 2.1 não forem suportados, somente o modo software renderer estará disponível (sem efeito de luz)',
        hardDriver: 'min. 150 MB'
      }
    ],
    comments: [
      {
        user: 'Player5',
        comment: 'Amei!',
        date: '2023-05-05',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      },
      {
        user: 'Player6',
        comment: 'Excelente!',
        date: '2023-06-01',
        hashtags: ['Ótimo Servidor', 'Exp Maravilhosa', 'Sem Lags', 'Power Abuser']
      }
    ]
  }
]
