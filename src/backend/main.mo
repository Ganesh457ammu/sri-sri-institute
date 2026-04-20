import Types "types/enquiry";
import EnquiryMixin "mixins/enquiry-api";
import List "mo:core/List";

actor {
  let enquiries = List.empty<Types.Enquiry>();
  var nextId : Nat = 0;

  include EnquiryMixin(enquiries, nextId);
};
