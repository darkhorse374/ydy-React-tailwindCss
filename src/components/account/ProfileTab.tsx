
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

interface ProfileFormValues {
  name: string;
  tagline: string;
  bio: string;
  phone: string;
  color: string;
}

const ProfileTab = () => {
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "Graham",
      tagline: "Wellness enthusiast",
      bio: "I'm passionate about mental health and community support.",
      phone: "+1 (555) 123-4567",
      color: "blue",
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    console.log(data);
  };

  return (
    <div className="mt-8 max-w-2xl">
      <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
      <form onSubmit={form.handleSubmit(onProfileSubmit)}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              {...form.register("name")}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input 
              id="tagline"
              {...form.register("tagline")}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              {...form.register("bio")}
              className="mt-1 min-h-24"
            />
          </div>
          
          <div>
            <div className="flex items-center">
              <Label htmlFor="phone" className="mr-2">Phone</Label>
              <span className="text-sm text-gray-500">(used for text notification)</span>
            </div>
            <Input 
              id="phone"
              {...form.register("phone")}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Profile Color</Label>
            <Form {...form}>
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-3 mt-2">
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="green" className="hidden peer" id="color-green" />
                        </FormControl>
                        <label 
                          htmlFor="color-green" 
                          className="w-8 h-8 bg-green-500 rounded-full cursor-pointer ring-offset-2 ring-offset-white peer-checked:ring-2 ring-green-500"
                        ></label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="blue" className="hidden peer" id="color-blue" />
                        </FormControl>
                        <label 
                          htmlFor="color-blue" 
                          className="w-8 h-8 bg-[#6699FF] rounded-full cursor-pointer ring-offset-2 ring-offset-white peer-checked:ring-2 ring-[#6699FF]"
                        ></label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="indigo" className="hidden peer" id="color-indigo" />
                        </FormControl>
                        <label 
                          htmlFor="color-indigo" 
                          className="w-8 h-8 bg-indigo-500 rounded-full cursor-pointer ring-offset-2 ring-offset-white peer-checked:ring-2 ring-indigo-500"
                        ></label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cyan" className="hidden peer" id="color-cyan" />
                        </FormControl>
                        <label 
                          htmlFor="color-cyan" 
                          className="w-8 h-8 bg-cyan-500 rounded-full cursor-pointer ring-offset-2 ring-offset-white peer-checked:ring-2 ring-cyan-500"
                        ></label>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </Form>
          </div>
          
          <Button type="submit" variant="blue-custom" className="mt-4">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
