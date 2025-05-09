
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User, Tag as TagIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

const Settings = () => {
  const { t } = useTranslation();
  const [tags, setTags] = React.useState([
    { id: '1', name: 'Important' },
    { id: '2', name: 'Urgent' },
    { id: '3', name: 'Review' }
  ]);
  const [newTag, setNewTag] = React.useState('');

  const handleRemoveTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now().toString(), name: newTag.trim() }]);
      setNewTag('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('settings.profile')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('common.name')}</Label>
              <Input id="name" placeholder={t('common.namePlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input id="email" type="email" placeholder={t('common.emailPlaceholder')} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TagIcon className="h-5 w-5" />
              {t('settings.tags')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Tag 
                    key={tag.id} 
                    variant="primary"
                    onRemove={() => handleRemoveTag(tag.id)}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </div>
              <div className="flex gap-2">
                <Input 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder={t('settings.newTag')} 
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag}>{t('settings.addTag')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              {t('settings.application')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.notifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.notificationsDescription')}
                  </p>
                </div>
                <Button variant="outline">{t('common.configure')}</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('settings.language')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.languageDescription')}
                  </p>
                </div>
                <Button variant="outline">{t('common.select')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
