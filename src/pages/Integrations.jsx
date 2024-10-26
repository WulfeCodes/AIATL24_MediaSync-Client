import { useState } from 'react';
import { Card, CardBody, CardFooter, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select, SelectItem } from "@nextui-org/react";
import { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin, PlusCircle, ExternalLink, Trash2 } from 'lucide-react';

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, platform: 'Facebook', icon: Facebook, handle: '@cooltechco', lastSync: '2 hours ago' },
    { id: 2, platform: 'Twitter', icon: Twitter, handle: '@techchampion', lastSync: '1 day ago' },
    { id: 3, platform: 'Instagram', icon: Instagram, handle: '@instatech', lastSync: '3 hours ago' },
    { id: 4, platform: 'YouTube', icon: Youtube, handle: 'TechTutorials', lastSync: '3 hours ago' },
    { id: 5, platform: 'LinkedIn', icon: Linkedin, handle: 'johndoe', lastSync: '5 hours ago' },
    { id: 6, platform: 'LinkedIn', icon: Linkedin, handle: 'cooltechco', lastSync: '1 hour ago' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [newIntegration, setNewIntegration] = useState({ platform: '', handle: '' });
  const [integrationToRemove, setIntegrationToRemove] = useState(null);

  const handleAddIntegration = () => {
    const iconMap = { Facebook, Twitter, Instagram, Youtube, Twitch, Linkedin };
    const newId = integrations.length ? integrations[integrations.length - 1].id + 1 : 1; // Ensure unique ID
    setIntegrations([...integrations, {
      id: newId,
      platform: newIntegration.platform,
      icon: iconMap[newIntegration.platform],
      handle: newIntegration.handle,
      lastSync: 'Just now'
    }]);
    setIsModalOpen(false);
    setNewIntegration({ platform: '', handle: '' });
  };

  const handleRemoveIntegration = () => {
    if (integrationToRemove) {
      setIntegrations(prevIntegrations =>
        prevIntegrations.filter(integration => integration.id !== integrationToRemove.id)
      );
      setIntegrationToRemove(null); // Reset after removing
      setIsConfirmOpen(false);
    }
  };

  const openRemoveConfirm = (integration) => {
    setIntegrationToRemove(integration);
    setIsConfirmOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="w-full">
            <CardBody>
              <div className="flex items-center space-x-4 mb-4">
                <integration.icon className="w-8 h-8 text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold">{integration.handle}</h2>
                  <p className="text-sm text-gray-500">{integration.platform}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Last sync: {integration.lastSync}</p>
            </CardBody>
            <CardFooter className="flex justify-between">
              <Button
                color="primary"
                variant="flat"
                startContent={<ExternalLink size={18} />}
              >
                Manage Account
              </Button>
              <Button
                color="danger"
                variant="flat"
                startContent={<Trash2 size={18} />}
                onClick={() => openRemoveConfirm(integration)}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
        <div onClick={() => setIsModalOpen(true)}>
          <Card className="w-full cursor-pointer">
            <CardBody className="flex flex-col items-center justify-center h-full">
              <PlusCircle className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-lg font-semibold">Add New Integration</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal for Adding New Integration */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add New Integration</ModalHeader>
          <ModalBody>
            <Select
              label="Platform"
              placeholder="Select a platform"
              value={newIntegration.platform}
              onChange={(e) => setNewIntegration({ ...newIntegration, platform: e.target.value })}
            >
              <SelectItem key="Facebook" value="Facebook">Facebook</SelectItem>
              <SelectItem key="Twitter" value="Twitter">Twitter</SelectItem>
              <SelectItem key="Instagram" value="Instagram">Instagram</SelectItem>
              <SelectItem key="YouTube" value="Youtube">YouTube</SelectItem>
              <SelectItem key="Twitch" value="Twitch">Twitch</SelectItem>
              <SelectItem key="LinkedIn" value="Linkedin">LinkedIn</SelectItem>
            </Select>
            <Input
              label="Handle"
              placeholder="Enter your handle"
              value={newIntegration.handle}
              onChange={(e) => setNewIntegration({ ...newIntegration, handle: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddIntegration}>
              Link Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal for Removing Integration */}
      <Modal isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <ModalContent>
          <ModalHeader>Confirm Removal</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to remove the {integrationToRemove?.platform} account "{integrationToRemove?.handle}"?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={handleRemoveIntegration}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default IntegrationsPage;
