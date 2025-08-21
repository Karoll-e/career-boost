import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUser } from "../../context/userContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  ArrowLeft,
  Upload
} from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { getUserInitials } from "../../utils/helper";

function Profile() {
  const { t } = useTranslation();
  const { user, setUser, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.profileImageUrl || user?.avatar || ""
  });
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.profileImageUrl || user.avatar || ""
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return <div>Please log in to access your profile.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('profile.messages.fileTypeError'));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('profile.messages.fileSizeError'));
      return;
    }

    setUploadingImage(true);
    
    try {
      const imageFormData = new FormData();
      imageFormData.append('avatar', file);

      console.log('Uploading avatar to:', API_PATHS.USER.UPLOAD_AVATAR);
      console.log('File:', file.name, file.size, file.type);

      const response = await axiosInstance.post(
        API_PATHS.USER.UPLOAD_AVATAR,
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Avatar upload response:', response.data);
      
      if (response.data && response.data.avatarUrl) {
        setFormData(prev => ({
          ...prev,
          avatar: response.data.avatarUrl
        }));
        
        // Update the user context with new avatar
        if (response.data.user) {
          setUser(response.data.user);
        }
        
        toast.success(t('profile.messages.pictureUploaded'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t('profile.messages.uploadError'));
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error(t('profile.messages.nameRequired'));
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error(t('profile.messages.emailRequired'));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('profile.messages.emailInvalid'));
      return;
    }

    setLoading(true);

    try {
      console.log('Updating profile to:', API_PATHS.USER.UPDATE_PROFILE);
      console.log('Update data:', { name: formData.name.trim(), email: formData.email.trim(), avatar: formData.avatar });

      const response = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar
      });

      console.log('Profile update response:', response.data);
      
      if (response.data && response.data.user) {
        setUser(response.data.user);
        
        // Update form data to reflect the changes
        setFormData(prev => ({
          ...prev,
          name: response.data.user.name,
          email: response.data.user.email,
          avatar: response.data.user.avatar || response.data.user.profileImageUrl
        }));
        
        toast.success(t('profile.messages.profileUpdated'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(t('profile.messages.updateError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('profile.title')}</h1>
              <p className="text-gray-600">{t('profile.subtitle')}</p>
            </div>
          </div>

          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-orange-600" />
                {t('profile.personalInfo')}
              </CardTitle>
              <CardDescription>
                {t('profile.personalInfoDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage 
                        src={formData.avatar || user?.profileImageUrl || user?.avatar} 
                        alt={formData.name} 
                      />
                      <AvatarFallback className="text-lg">
                        {getUserInitials(formData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-orange-600 hover:bg-orange-700"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">{t('profile.profilePicture')}</h3>
                    <p className="text-sm text-gray-500">
                      {t('profile.profilePictureDescription')}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {t('profile.profilePictureFormat')}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {t('profile.fullName')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('profile.placeholders.name')}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {t('profile.emailAddress')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('profile.placeholders.email')}
                      required
                      className="w-full"
                    />
                  </div>
                  
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={loading || uploadingImage}
                    className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 min-w-32"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {loading ? t('profile.saving') : t('profile.saveChanges')}
                  </Button>
                </div>
                
              </form>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and membership status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Account Created</Label>
                  <p className="text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not available'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Updated</Label>
                  <p className="text-gray-900">
                    {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not available'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;