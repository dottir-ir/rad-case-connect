
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Plus } from 'lucide-react';

const CaseUploadForm = () => {
  const [formData, setFormData] = useState({
    patientAge: '',
    patientGender: '',
    clinicalPresentation: '',
    imagingFindings: '',
    finalDiagnosis: '',
    discussion: '',
  });

  const [differentialDiagnoses, setDifferentialDiagnoses] = useState<string[]>([]);
  const [currentDifferential, setCurrentDifferential] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDifferentialDiagnosis = () => {
    if (currentDifferential.trim() && !differentialDiagnoses.includes(currentDifferential.trim())) {
      setDifferentialDiagnoses([...differentialDiagnoses, currentDifferential.trim()]);
      setCurrentDifferential('');
    }
  };

  const removeDifferentialDiagnosis = (index: number) => {
    setDifferentialDiagnoses(differentialDiagnoses.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting case:', {
      ...formData,
      differentialDiagnoses,
      tags,
      uploadedImages
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-medical-blue">Upload New Medical Case</CardTitle>
          <p className="text-medical-gray">
            Share your knowledge with the medical community by uploading a detailed case study
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientAge">Patient Age</Label>
                <Input
                  id="patientAge"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.patientAge}
                  onChange={(e) => handleInputChange('patientAge', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="patientGender">Patient Gender</Label>
                <Select value={formData.patientGender} onValueChange={(value) => handleInputChange('patientGender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clinical Presentation */}
            <div>
              <Label htmlFor="clinicalPresentation">Clinical Presentation</Label>
              <Textarea
                id="clinicalPresentation"
                placeholder="Describe the patient's presenting symptoms, history, and clinical context..."
                value={formData.clinicalPresentation}
                onChange={(e) => handleInputChange('clinicalPresentation', e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label>Radiographic Images</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-medical-blue transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">
                  Drag and drop images here, or{' '}
                  <button type="button" className="text-medical-blue hover:underline">
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  DICOM, JPEG, PNG files up to 10MB each
                </p>
              </div>
            </div>

            {/* Imaging Findings */}
            <div>
              <Label htmlFor="imagingFindings">Imaging Findings</Label>
              <Textarea
                id="imagingFindings"
                placeholder="Describe the key imaging findings and abnormalities..."
                value={formData.imagingFindings}
                onChange={(e) => handleInputChange('imagingFindings', e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            {/* Differential Diagnosis */}
            <div>
              <Label>Differential Diagnosis</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  placeholder="Add a differential diagnosis"
                  value={currentDifferential}
                  onChange={(e) => setCurrentDifferential(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDifferentialDiagnosis())}
                />
                <Button type="button" onClick={addDifferentialDiagnosis} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {differentialDiagnoses.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {differentialDiagnoses.map((diagnosis, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {diagnosis}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeDifferentialDiagnosis(index)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Final Diagnosis */}
            <div>
              <Label htmlFor="finalDiagnosis">Final Diagnosis</Label>
              <Input
                id="finalDiagnosis"
                placeholder="Enter the confirmed diagnosis"
                value={formData.finalDiagnosis}
                onChange={(e) => handleInputChange('finalDiagnosis', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Teaching Discussion */}
            <div>
              <Label htmlFor="discussion">Teaching Discussion</Label>
              <Textarea
                id="discussion"
                placeholder="Provide educational insights, key learning points, and clinical pearls..."
                value={formData.discussion}
                onChange={(e) => handleInputChange('discussion', e.target.value)}
                className="mt-1 min-h-[120px]"
              />
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="mt-1 flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., Chest CT, Pediatric)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeTag(index)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-medical-blue hover:bg-medical-blue-dark">
                Publish Case
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseUploadForm;
