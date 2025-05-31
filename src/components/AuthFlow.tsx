import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Upload, Play } from 'lucide-react';

interface AuthFlowProps {
  onDemoLogin?: (role: 'doctor' | 'student') => void;
}

const AuthFlow = ({ onDemoLogin }: AuthFlowProps) => {
  const [currentStep, setCurrentStep] = useState<'signin' | 'signup' | 'doctor-verification'>('signin');
  const [userRole, setUserRole] = useState<'doctor' | 'student' | ''>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    institution: '',
    credentials: '',
    bio: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    if (userRole === 'doctor') {
      setCurrentStep('doctor-verification');
    } else {
      // Handle student signup - immediate access
      console.log('Student signup successful');
    }
  };

  if (currentStep === 'doctor-verification') {
    return (
      <div className="min-h-screen bg-medical-gray-light flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-medical-blue">Doctor Verification Required</CardTitle>
            <p className="text-medical-gray">
              To maintain the quality of our medical community, all doctors must be manually verified before accessing the platform.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Demo Access Section */}
            <div className="bg-medical-blue/10 border border-medical-blue/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-5 w-5 text-medical-blue" />
                <span className="font-semibold text-medical-blue">Try Demo Mode</span>
              </div>
              <p className="text-sm text-medical-gray-dark mb-3">
                Want to explore the platform right away? Use our demo doctor account.
              </p>
              <Button 
                onClick={() => onDemoLogin?.('doctor')}
                className="w-full bg-medical-blue hover:bg-medical-blue-dark"
              >
                <Play className="h-4 w-4 mr-2" />
                Enter as Demo Doctor
              </Button>
            </div>

            <div className="bg-medical-warning/10 border border-medical-warning/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-medical-warning" />
                <span className="font-semibold text-medical-warning">Verification Process</span>
              </div>
              <p className="text-sm text-medical-gray-dark">
                Please provide your medical credentials below. Our team will review your application within 24-48 hours.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="institution">Medical Institution/Hospital</Label>
                <Input
                  id="institution"
                  placeholder="e.g., Johns Hopkins Hospital"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="credentials">Medical License Number</Label>
                <Input
                  id="credentials"
                  placeholder="Your medical license or registration number"
                  value={formData.credentials}
                  onChange={(e) => handleInputChange('credentials', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Upload Verification Documents</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-medical-blue transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Upload medical license, hospital ID, or other verification documents
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, JPEG, PNG files up to 5MB each
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief description of your medical background and specialization..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
                Submit for Verification
              </Button>
            </form>

            <div className="bg-medical-success/10 border border-medical-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-medical-success" />
                <span className="font-semibold text-medical-success">What happens next?</span>
              </div>
              <ul className="mt-2 text-sm text-medical-gray-dark space-y-1">
                <li>• Our verification team will review your credentials</li>
                <li>• You'll receive an email notification within 24-48 hours</li>
                <li>• Once approved, you can access all platform features</li>
                <li>• You'll be able to upload cases and participate in discussions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medical-gray-light flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-medical-blue">
            {currentStep === 'signin' ? 'Welcome Back' : 'Join MedCases'}
          </CardTitle>
          <p className="text-medical-gray">
            {currentStep === 'signin' 
              ? 'Sign in to access medical cases and discussions' 
              : 'Create your account to start learning and sharing'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Demo Accounts Section */}
          <div className="bg-gradient-to-r from-medical-blue/10 to-medical-blue-light/10 border border-medical-blue/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-5 w-5 text-medical-blue" />
              <span className="font-semibold text-medical-blue">Try Demo Accounts</span>
            </div>
            <div className="space-y-2">
              <Button 
                onClick={() => onDemoLogin?.('doctor')}
                className="w-full bg-medical-blue hover:bg-medical-blue-dark"
                size="sm"
              >
                Demo Doctor Account
              </Button>
              <Button 
                onClick={() => onDemoLogin?.('student')}
                variant="outline" 
                className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue/10"
                size="sm"
              >
                Demo Student Account
              </Button>
            </div>
            <p className="text-xs text-medical-gray-dark mt-2">
              Explore all features without creating an account
            </p>
          </div>

          <Separator className="my-4" />

          {currentStep === 'signup' && (
            <>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Dr. John Smith"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="role">I am a...</Label>
                <Select value={userRole} onValueChange={(value: 'doctor' | 'student') => setUserRole(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor / Healthcare Professional</SelectItem>
                    <SelectItem value="student">Medical Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {userRole && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    {userRole === 'doctor' ? (
                      <Badge variant="outline" className="bg-medical-blue/10 text-medical-blue">
                        Doctor Verification Required
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-medical-success/10 text-medical-success">
                        Immediate Access
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-medical-gray-dark mt-1">
                    {userRole === 'doctor' 
                      ? 'Doctors require manual verification to maintain platform quality'
                      : 'Students can access the platform immediately after signup'
                    }
                  </p>
                </div>
              )}
            </>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            className="w-full bg-medical-blue hover:bg-medical-blue-dark"
            onClick={currentStep === 'signup' ? handleSignUp : () => console.log('Sign in')}
          >
            {currentStep === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-medical-gray">
              {currentStep === 'signin' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="ghost"
              className="text-medical-blue hover:text-medical-blue-dark"
              onClick={() => setCurrentStep(currentStep === 'signin' ? 'signup' : 'signin')}
            >
              {currentStep === 'signin' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFlow;
