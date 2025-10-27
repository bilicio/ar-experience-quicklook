import { Request, Response } from 'express'

/**
 * Rota de registro que cria o cookie de acesso
 * Recebe email via query string e redireciona para a home com cookie setado
 */
export const registerRoute = (req: Request, res: Response) => {
  const email = req.query.email as string

  // Validação básica do email
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).send('Email inválido')
  }

  // Define o cookie 'ar_access' com opções de segurança
  res.cookie('ar_access', 'granted', {
    httpOnly: true, // Não acessível via JavaScript (segurança contra XSS)
    secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
    maxAge: 24 * 60 * 60 * 1000, // 24 horas em milliseconds
    sameSite: 'strict' // Proteção contra CSRF
  })

  // Redireciona para a home (URL limpa, sem parâmetros)
  res.redirect('/aiexperience/')
}
