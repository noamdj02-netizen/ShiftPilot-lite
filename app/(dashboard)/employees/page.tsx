"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmployees } from "@/hooks/useEmployees";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Plus, Mail, Phone, Edit, Trash2 } from "lucide-react";

export default function EmployeesPage() {
  const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee } =
    useEmployees();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "employee" as "owner" | "manager" | "employee",
    hourly_rate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const employeeData = {
        email: formData.email,
        first_name: formData.first_name || undefined,
        last_name: formData.last_name || undefined,
        phone: formData.phone || undefined,
        role: formData.role,
        hourly_rate: formData.hourly_rate
          ? parseFloat(formData.hourly_rate)
          : undefined,
      };

      if (editingEmployee) {
        await updateEmployee(editingEmployee, employeeData);
      } else {
        await createEmployee(employeeData);
      }

      setIsDialogOpen(false);
      setEditingEmployee(null);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        role: "employee",
        hourly_rate: "",
      });
    } catch (error) {
      console.error("Error saving employee:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la sauvegarde de l'employé";
      
      if (errorMessage.includes("Aucun utilisateur")) {
        alert(
          "L'utilisateur doit d'abord s'inscrire avec cet email. Fonctionnalité d'invitation par email à venir."
        );
      } else {
        alert(errorMessage);
      }
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee.id);
    setFormData({
      email: employee.email,
      first_name: employee.first_name || "",
      last_name: employee.last_name || "",
      phone: employee.phone || "",
      role: employee.role || "employee",
      hourly_rate: employee.hourly_rate?.toString() || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (employeeId: string) => {
    if (confirm("Êtes-vous sûr de vouloir désactiver cet employé ?")) {
      try {
        await deleteEmployee(employeeId);
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-foreground-muted dark:text-dark-foreground-muted">
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground dark:text-dark-foreground">
            Employés
          </h1>
          <p className="text-foreground-muted dark:text-dark-foreground-muted mt-1">
            Gérez votre équipe et leurs informations
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="primary" onClick={() => {
              setEditingEmployee(null);
              setFormData({
                email: "",
                first_name: "",
                last_name: "",
                phone: "",
                role: "employee",
                hourly_rate: "",
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un employé
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? "Modifier l'employé" : "Ajouter un employé"}
              </DialogTitle>
              <DialogDescription>
                {editingEmployee
                  ? "Modifiez les informations de l'employé"
                  : "Ajoutez un nouvel employé à votre équipe"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Prénom</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nom</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: "owner" | "manager" | "employee") =>
                      setFormData({ ...formData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employé</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="owner">Propriétaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourly_rate">Taux horaire (€)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    step="0.01"
                    value={formData.hourly_rate}
                    onChange={(e) =>
                      setFormData({ ...formData, hourly_rate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="primary">
                  {editingEmployee ? "Enregistrer" : "Ajouter"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Employees List */}
      {employees.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-foreground-muted dark:text-dark-foreground-muted mb-4">
            Aucun employé pour le moment
          </p>
          <Button
            variant="primary"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter votre premier employé
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => {
            const initials =
              employee.first_name && employee.last_name
                ? `${employee.first_name[0]}${employee.last_name[0]}`
                : employee.email[0]?.toUpperCase() || "U";

            return (
              <Card key={employee.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar_url || undefined} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground dark:text-dark-foreground">
                        {employee.first_name && employee.last_name
                          ? `${employee.first_name} ${employee.last_name}`
                          : employee.email}
                      </p>
                      <p className="text-sm text-foreground-muted dark:text-dark-foreground-muted">
                        {employee.role === "owner"
                          ? "Propriétaire"
                          : employee.role === "manager"
                          ? "Manager"
                          : "Employé"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="p-2 text-foreground-muted dark:text-dark-foreground-muted hover:text-foreground dark:hover:text-dark-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="p-2 text-foreground-muted dark:text-dark-foreground-muted hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground-muted dark:text-dark-foreground-muted">
                    <Mail className="h-4 w-4" />
                    <span>{employee.email}</span>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-2 text-foreground-muted dark:text-dark-foreground-muted">
                      <Phone className="h-4 w-4" />
                      <span>{employee.phone}</span>
                    </div>
                  )}
                  {employee.hourly_rate && (
                    <div className="text-foreground-muted dark:text-dark-foreground-muted">
                      {employee.hourly_rate}€/h
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

