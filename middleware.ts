import { NextRequest, NextResponse } from 'next/server'

// Lista de rutas privadas que requieren autenticación
const privateRoutes = [
  '/questions-bank',
  '/categories', 
  '/evaluation-management',
  '/profile',
  '/settings',
  '/billing',
  '/dashboard'
]

// Lista de rutas públicas (solo para usuarios NO autenticados)
const publicOnlyRoutes = [
  '/public',
  '/public/about',
  '/public/features', 
  '/public/pricing',
  '/auth/login',
  '/auth/register'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Verificar si la ruta actual es privada
  const isPrivateRoute = privateRoutes.some(route => 
    pathname.startsWith(route)
  )
  
  // Verificar si la ruta actual es pública (solo para usuarios NO autenticados)
  const isPublicOnlyRoute = publicOnlyRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  )
  
  // Obtener información de autenticación desde las cookies o headers
  // Por ahora simulamos la verificación ya que usamos localStorage en el cliente
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true'
  
  // Si es ruta privada y no está autenticado, redirigir al login
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Si está autenticado y trata de acceder a rutas públicas, redirigir al dashboard
  if (isAuthenticated && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Si está autenticado y accede a la raíz, redirigir al dashboard
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
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