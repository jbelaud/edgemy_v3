"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog.js"
import { Button } from "../ui/button.js"

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Se connecter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            Connectez-vous à votre compte pour accéder à toutes les fonctionnalités.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Ici, vous pouvez ajouter votre formulaire de connexion */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="password" className="text-right">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Se connecter</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 