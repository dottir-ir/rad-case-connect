
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookmarkIcon, FileText, Edit } from 'lucide-react';

interface UserProfileProps {
  userRole?: 'doctor' | 'student' | null;
  userName?: string;
}

const UserProfile = ({ userRole = null, userName = '' }: UserProfileProps) => {
  // Mock data for demo
  const mockSavedCases = [
    {
      id: 1,
      title: "Acute MI with ST Elevation",
      patientAge: 45,
      patientGender: "Male",
      tags: ["Cardiology", "Emergency", "ECG"]
    },
    {
      id: 2,
      title: "Pneumothorax in Young Adult",
      patientAge: 22,
      patientGender: "Female", 
      tags: ["Chest X-ray", "Emergency", "Respiratory"]
    }
  ];

  const mockPostedCases = [
    {
      id: 3,
      title: "Complex Spinal Fracture",
      patientAge: 35,
      patientGender: "Male",
      tags: ["Spine", "Trauma", "CT"],
      likes: 24,
      comments: 12
    },
    {
      id: 4,
      title: "Pediatric Brain Tumor",
      patientAge: 8,
      patientGender: "Female",
      tags: ["Pediatric", "Neurology", "MRI"],
      likes: 18,
      comments: 8
    }
  ];

  const userBio = userRole === 'doctor' 
    ? "Radiologist with 12 years of experience specializing in emergency and trauma imaging. Passionate about medical education and case-based learning."
    : "4th year medical student with keen interest in radiology and diagnostic imaging. Excited to learn from experienced practitioners.";

  const userTitle = userRole === 'doctor' 
    ? "Radiologist at Johns Hopkins Hospital"
    : "Medical Student at Harvard Medical School";

  return (
    <div className="min-h-screen bg-medical-gray-light">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.jpg" />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-medical-blue">{userName}</h1>
                    <p className="text-medical-gray">{userTitle}</p>
                    <Badge 
                      variant="outline" 
                      className={userRole === 'doctor' ? 'bg-medical-blue/10 text-medical-blue' : 'bg-medical-success/10 text-medical-success'}
                    >
                      {userRole === 'doctor' ? 'Verified Doctor' : 'Medical Student'}
                    </Badge>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <p className="text-medical-gray-dark leading-relaxed">
                  {userBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookmarkIcon className="h-4 w-4" />
              Saved Cases
            </TabsTrigger>
            {userRole === 'doctor' && (
              <TabsTrigger value="posted" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Posted Cases
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="saved" className="mt-6">
            <div className="grid gap-4">
              {mockSavedCases.map((case_) => (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-medical-blue">{case_.title}</h3>
                      <BookmarkIcon className="h-5 w-5 text-medical-blue fill-current" />
                    </div>
                    <p className="text-sm text-medical-gray mb-3">
                      {case_.patientAge} year old {case_.patientGender.toLowerCase()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {case_.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {userRole === 'doctor' && (
            <TabsContent value="posted" className="mt-6">
              <div className="grid gap-4">
                {mockPostedCases.map((case_) => (
                  <Card key={case_.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-medical-blue">{case_.title}</h3>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-medical-gray mb-3">
                        {case_.patientAge} year old {case_.patientGender.toLowerCase()}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {case_.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-medical-gray">
                        <span>{case_.likes} likes</span>
                        <span>{case_.comments} comments</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
