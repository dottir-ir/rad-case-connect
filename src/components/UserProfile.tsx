
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, Calendar, Save, Upload, Edit } from 'lucide-react';

const UserProfile = () => {
  const [userRole] = useState<'doctor' | 'student'>('doctor');
  const [isOwnProfile] = useState(true);

  const mockUser = {
    name: 'Dr. Sarah Chen',
    title: 'Interventional Radiologist',
    bio: 'Passionate about medical education and advancing radiology knowledge. Specializing in interventional procedures and complex diagnostic imaging.',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    casesPosted: 15,
    casesSaved: 42,
    avatar: '',
  };

  const mockSavedCases = [
    {
      id: '1',
      title: 'Complex Aortic Dissection Case',
      author: 'Dr. Michael Rodriguez',
      tags: ['Cardiovascular', 'Emergency'],
      createdAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Pediatric Mediastinal Mass',
      author: 'Dr. Emily Johnson',
      tags: ['Pediatric', 'Chest'],
      createdAt: '1 week ago',
    },
    {
      id: '3',
      title: 'Rare Spinal Tumor Presentation',
      author: 'Dr. James Wilson',
      tags: ['Spine', 'Oncology'],
      createdAt: '2 weeks ago',
    },
  ];

  const mockPostedCases = [
    {
      id: '1',
      title: 'Type B Aortic Dissection Teaching Case',
      tags: ['Cardiovascular', 'CT Angiography'],
      likes: 24,
      comments: 8,
      createdAt: '3 days ago',
    },
    {
      id: '2',
      title: 'Interventional Radiology: TIPS Procedure',
      tags: ['Interventional', 'Liver'],
      likes: 18,
      comments: 12,
      createdAt: '1 week ago',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={mockUser.avatar} />
              <AvatarFallback className="text-2xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-medical-blue">{mockUser.name}</h1>
                <Badge variant="outline" className="bg-medical-blue/10 text-medical-blue">
                  {userRole === 'doctor' ? 'Verified Doctor' : 'Medical Student'}
                </Badge>
              </div>
              
              <p className="text-lg text-medical-gray mb-2">{mockUser.title}</p>
              <p className="text-medical-gray-dark mb-4">{mockUser.bio}</p>
              
              <div className="flex items-center gap-4 text-sm text-medical-gray">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {mockUser.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {mockUser.joinDate}
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-medical-blue">{mockUser.casesSaved}</p>
              <p className="text-sm text-medical-gray">Cases Saved</p>
            </div>
            {userRole === 'doctor' && (
              <div className="text-center">
                <p className="text-2xl font-bold text-medical-blue">{mockUser.casesPosted}</p>
                <p className="text-sm text-medical-gray">Cases Posted</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-2xl font-bold text-medical-blue">156</p>
              <p className="text-sm text-medical-gray">Total Likes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-medical-blue">89</p>
              <p className="text-sm text-medical-gray">Comments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="saved" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Saved Cases
          </TabsTrigger>
          {userRole === 'doctor' && (
            <TabsTrigger value="posted" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Posted Cases
            </TabsTrigger>
          )}
        </TabsList>

        {/* Saved Cases */}
        <TabsContent value="saved" className="mt-6">
          <div className="space-y-4">
            {mockSavedCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-medical-blue mb-1">{case_.title}</h3>
                      <p className="text-sm text-medical-gray mb-2">by {case_.author}</p>
                      <div className="flex gap-2 mb-2">
                        {case_.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-medical-gray">{case_.createdAt}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-medical-blue">
                      View Case
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Posted Cases (Doctor only) */}
        {userRole === 'doctor' && (
          <TabsContent value="posted" className="mt-6">
            <div className="space-y-4">
              {mockPostedCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-medical-blue mb-1">{case_.title}</h3>
                        <div className="flex gap-2 mb-2">
                          {case_.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-medical-gray">
                          <span>{case_.likes} likes</span>
                          <span>{case_.comments} comments</span>
                          <span>{case_.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-medical-gray">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-medical-blue">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfile;
