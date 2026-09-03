import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Mail, MapPin, Lock, ShieldCheck, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  businessType: z.string().min(2, "Business type/industry is required"),
  message: z.string().min(10, "Please provide a brief message"),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
const [submitError, setSubmitError] = useState("");

const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
});

  const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  setSubmitError("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      throw new Error(payload.error || "Unable to submit your enquiry");
    }

    reset();
    setIsSuccess(true);
  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : "Unable to submit your enquiry",
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="contact" className="bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Info Panel */}
            <div className="relative flex flex-col justify-between overflow-hidden p-6 text-primary-foreground sm:p-10 lg:p-16">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
              
              <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
  Let’s make the numbers simpler
</p>

<h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl">
  Practical financial support for the next stage of your business.
</h2>

<p className="mt-5 mb-12 max-w-md text-lg leading-relaxed text-primary-foreground/80">
  Tell us what you need help with and a little about your business. We’ll
  listen first, then recommend the most practical next step.
</p>
                
               <div className="space-y-8">
  <a
    href="https://wa.me/27816733268"
    target="_blank"
    rel="noreferrer"
    className="group flex min-w-0 items-start gap-4"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors group-hover:bg-[#25D366] group-hover:text-white">
      <MessageSquare className="h-5 w-5" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-primary-foreground/60">
        WhatsApp Us
      </p>
      <p className="text-base font-semibold leading-6 sm:text-lg">
        +27 81 673 3268
      </p>
    </div>
  </a>

  <a
    href="mailto:enquiries@futurecents.co.za"
    className="group flex min-w-0 items-start gap-4"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
      <Mail className="h-5 w-5" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-primary-foreground/60">
        Email
      </p>
    <p className="whitespace-nowrap text-[clamp(0.75rem,3.6vw,1.125rem)] font-semibold leading-6 tracking-tight">
  enquiries@futurecents.co.za
</p>
    </div>
  </a>

  <div className="flex min-w-0 items-start gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
      <MapPin className="h-5 w-5" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-primary-foreground/60">
        Location
      </p>
      <p className="text-base font-semibold leading-6 sm:text-lg">
        Remote across South Africa
      </p>
    </div>
  </div>
   </div>
</div>

              <div className="mt-16 relative z-10">
                <Button asChild className="bg-[#25D366] text-white hover:bg-[#20b858] border-none text-base h-12 gap-2 w-full sm:w-auto mb-3">
                  <a href="https://wa.me/27816733268" target="_blank" rel="noreferrer">
                    <MessageSquare className="w-5 h-5" /> Chat on WhatsApp Now
                  </a>
                </Button>
                <div className="flex items-center gap-2 text-primary-foreground/80 text-sm font-medium">
                  <Clock className="w-4 h-4" /> Send us a message during business hours
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex flex-col justify-center border-l border-border bg-white p-6 sm:p-10 lg:p-16">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours to discuss how we can help your business.</p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
  <label htmlFor="website">Website</label>
  <Input
    id="website"
    tabIndex={-1}
    autoComplete="off"
    {...register("website")}
  />
</div>
                  <h3 className="mb-6 text-2xl font-bold text-foreground">
  Prefer to write? Send an enquiry.
</h3>
                  
                  <div className="space-y-2">
                   <label
  htmlFor="contact-name"
  className="text-sm font-semibold text-foreground"
>
  Full Name
</label>
<Input
  id="contact-name"
  {...register("name")}
  placeholder="John Doe"
  autoComplete="name"
  className="h-11 bg-background"
/>
                    {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
  htmlFor="contact-email"
  className="text-sm font-semibold text-foreground"
>
  Email Address
</label>
<Input
  id="contact-email"
  {...register("email")}
  type="email"
  placeholder="john@company.co.za"
  autoComplete="email"
  className="h-11 bg-background"
/>
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
  htmlFor="contact-business-type"
  className="text-sm font-semibold text-foreground"
>
 What do you need help with?
</label>
<Input
  id="contact-business-type"
  {...register("businessType")}
  placeholder="e.g. starting a company, SARS compliance, financial statements"
  className="h-11 bg-background"
/>
                    {errors.businessType && <p className="text-destructive text-xs">{errors.businessType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label
  htmlFor="contact-message"
  className="text-sm font-semibold text-foreground"
>
 Tell us about your business and your current situation
</label>
<Textarea
  id="contact-message"
  {...register("message")}
  placeholder="Tell us what your business does, whether it is already registered, and what you need help with."
  className="h-32 resize-none bg-background py-3"
/>
                    {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                  </div>

                  <div className="pt-2">
                    {submitError && (
  <p
    role="alert"
    className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
  >
    {submitError}
  </p>
)}
                    <Button type="submit" size="lg" className="w-full mb-6 h-12 text-base" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit Enquiry"}
                    </Button>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-primary" /> Secure form submission
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary" /> Your information is kept private
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
