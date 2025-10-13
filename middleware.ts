import { NextRequest, NextResponse } from 'next/server'

// Lista de rutas privadas que requieren autenticación
const privateRoutes = [
  '/questions',
  '/categories', 
  '/evaluations',
  '/profile',
  '/settings',
  '/billing'
]

// Lista de rutas públicas para usuarios no autenticados (para uso futuro)
// const publicRoutes = [
//   '/',
//   '/about',
//   '/features', 
//   '/pricing',
//   '/auth/login',
//   '/auth/register',
//   '/terms',
//   '/privacy'
// ]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar si la ruta actual es privada
  const isPrivateRoute = privateRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Verificar si la ruta actual es pública (para uso futuro)
  // const isPublicRoute = publicRoutes.some(route => 
  //   pathname === route || pathname.startsWith(route)
  // )
  
  // Obtener información de autenticación desde las cookies o headers
  // Por ahora simulamos la verificación ya que usamos localStorage en el cliente
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'
  
  // Si es ruta privada y no está autenticado, redirigir al login
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Si está autenticado y trata de acceder a login/register, redirigir al dashboard
  if (isAuthenticated && (pathname === '/auth/login' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/questions', request.url))
  }
  
  return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Coincidir con todos los request paths excepto los que empiecen con:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}