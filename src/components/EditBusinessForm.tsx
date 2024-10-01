"use client";
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import lanKommuner from '@/lib/lanKommuner';

const EditBusinessForm = ({ business, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(business || {});
  const [kommuner, setKommuner] = useState([]);

  useEffect(() => {
    if (business && business.county) {
      setFormData(business);
      setKommuner(lanKommuner[business.county] || []);
    }
  }, [business]);

  useEffect(() => {
    if (formData.county) {
      setKommuner(lanKommuner[formData.county] || []);
    }
  }, [formData.county]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Redigera verksamhet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Namn</label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="companyName" className="text-right">Företagsnamn</label>
              <Input id="companyName" name="companyName" value={formData.companyName || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">Typ</label>
              <Select id="type" name="type" value={formData.type || ''} onChange={handleInputChange} className="col-span-3">
                <option value="">Välj typ</option>
                <option value="SOL">SOL</option>
                <option value="LSS">LSS</option>
                <option value="Familjehem">Familjehem</option>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="orgNumber" className="text-right">Org nummer</label>
              <Input id="orgNumber" name="orgNumber" value={formData.orgNumber || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="streetAddress" className="text-right">Gatuadress</label>
              <Input id="streetAddress" name="streetAddress" value={formData.streetAddress || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="postalCode" className="text-right">Postnummer</label>
              <Input id="postalCode" name="postalCode" value={formData.postalCode || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="city" className="text-right">Ort</label>
              <Input id="city" name="city" value={formData.city || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="county" className="text-right">Län</label>
              <Select id="county" name="county" value={formData.county || ''} onChange={handleInputChange} className="col-span-3">
                <option value="">Välj län</option>
                {Object.keys(lanKommuner).map((lan) => (
                  <option key={lan} value={lan}>{lan}</option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="municipality" className="text-right">Kommun</label>
              <Select id="municipality" name="municipality" value={formData.municipality || ''} onChange={handleInputChange} className="col-span-3">
                <option value="">Välj kommun</option>
                {kommuner.map((kommun) => (
                  <option key={kommun} value={kommun}>{kommun}</option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">Telefon</label>
              <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="website" className="text-right">Hemsida</label>
              <Input id="website" name="website" value={formData.website || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="koncern" className="text-right">Koncern/kedja</label>
              <Input id="koncern" name="koncern" value={formData.koncern || ''} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSkyddatBoende"
                name="isSkyddatBoende"
                checked={formData.isSkyddatBoende || false}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isSkyddatBoende: checked }))}
              />
              <label htmlFor="isSkyddatBoende">Skyddat boende</label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Spara ändringar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBusinessForm;