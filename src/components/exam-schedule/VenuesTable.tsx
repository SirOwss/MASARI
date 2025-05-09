
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VenuesTableProps } from './types';

export const VenuesTable = ({ 
  venues, 
  isLoading, 
  onEditVenue, 
  onDeleteVenue, 
  onAddVenue 
}: VenuesTableProps) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Droplet className="h-5 w-5" />
            {t('schedule.venueManagement')}
          </span>
          <Button variant="outline" size="sm" onClick={onAddVenue}>
            <Plus className="h-4 w-4 mr-1" />
            {t('schedule.addVenue')}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">{t('schedule.loadingVenues')}</div>
        ) : venues.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">{t('schedule.noVenues')}</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('schedule.venueName')}</TableHead>
                  <TableHead>{t('schedule.capacity')}</TableHead>
                  <TableHead className="text-right">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {venues.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell>{venue.name}</TableCell>
                    <TableCell>{venue.capacity} {t('schedule.students')}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditVenue(venue)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">{t('common.edit')}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteVenue(venue.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">{t('common.delete')}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
