import { Request, Response, NextFunction } from 'express'

/**
 * Middleware que verifica se o cookie de acesso está presente
 * Redireciona para página de acesso negado se não estiver
 */
export const checkAccessCookie = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o cookie 'ar_access' existe
  const hasAccess = req.cookies && req.cookies['ar_access']

  if (hasAccess) {
    // Cookie válido, permite o acesso
    next()
  } else {
    // Sem cookie, redireciona para página de acesso negado
    res.redirect('/aiexperience/acesso-negado.html')
  }
}
